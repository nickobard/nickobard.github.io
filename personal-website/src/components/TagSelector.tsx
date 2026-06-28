import {useEffect, useMemo, useRef, useState} from "react";
import {useExperienceContext} from "../context/ExperienceContext.tsx";
import Fuse from "fuse.js"
import './TagSelector.css'
import {flattenExperienceTree} from "../utils/flattenExperienceTree.ts";
import {imputeExperienceItemsTags} from "../utils/imputeTransitiveClosureTags.ts";
import {tagGraph} from "../data/tags/general.ts";
import {countTags, sortCountedTags} from "../utils/countTags.ts";
import {filterExperienceItemsByTags} from "../utils/filterExperienceByTags.ts";
import {Tag} from "./Tag.tsx";


export function TagSelector() {

    const {experienceData, selectedTags, toggleTag, experienceViewControlsRef} = useExperienceContext();

    const filteredExperienceItems = useMemo(() => {
        const experienceDataFlat = flattenExperienceTree(experienceData);
        const experienceDataFlatWithTagImputation = imputeExperienceItemsTags(experienceDataFlat, tagGraph);
        return filterExperienceItemsByTags(experienceDataFlatWithTagImputation, selectedTags);
    }, [experienceData, selectedTags]);

    const countedAllTags = sortCountedTags(countTags(filteredExperienceItems));

    const fuse = new Fuse(countedAllTags, {
        keys: ["tag"],
        threshold: 0.4,
    });

    const [tagQuery, setTagQuery] = useState("");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const visibleTags =
        tagQuery.trim() === ""
            ? countedAllTags
            : fuse.search(tagQuery).map((result) => result.item);
    const countedTagsByName = new Map(countedAllTags.map((countedTag) => [countedTag.tag, countedTag]));
    const selectedCountedTags = sortCountedTags(selectedTags.map((tag) => countedTagsByName.get(tag) ?? {tag, count: 0}));

    const inputAreaRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const selectedTagsRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            const target = event.target as Node;

            const clickedInside = inputAreaRef.current?.contains(target) ||
                dropdownRef.current?.contains(target) ||
                selectedTagsRef.current?.contains(target) ||
                experienceViewControlsRef.current?.contains(target);

            if (
                !clickedInside
            ) {
                setIsTagDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [experienceViewControlsRef]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const wasInputFocusedBeforeClick = useRef(false);

    return (<>

        <p className="tag-controls-tip">Tip about how to use the controls: the default view is a hierarchial structure,
            standard as if sending a resume. If you seek for concrete skills and knowledge, use the tag selector to
            filter by the skills or technologies you are interested in. I also recommend to try the flat view, where you
            can find relevant experience even faster, without navigation in the tree.</p>

        <div className="tag-selector">
            <div ref={inputAreaRef}>
                <input
                    ref={inputRef}
                    className="tag-search"
                    type="text"
                    placeholder="Filter by tags..."
                    value={tagQuery}
                    onMouseDown={() => {
                        wasInputFocusedBeforeClick.current = document.activeElement === inputRef.current
                    }}
                    onFocus={() => setIsTagDropdownOpen(true)}
                    onClick={() => {
                        if (wasInputFocusedBeforeClick.current) {
                            setIsTagDropdownOpen((prev) => !prev)
                        } else {
                            setIsTagDropdownOpen(true)
                        }
                    }}
                    onChange={(event) => {
                        setTagQuery(event.target.value);
                        setIsTagDropdownOpen(true);
                    }}

                />
            </div>


            {isTagDropdownOpen && (
                <div className="tag-dropdown" ref={dropdownRef}>
                    {visibleTags.map((countedTag) => (
                        <Tag
                            key={countedTag.tag}
                            countedTag={countedTag}
                            isSelected={selectedTags.includes(countedTag.tag)}
                            onToggle={toggleTag}
                        />
                    ))}
                </div>
            )}
        </div>

        {selectedTags.length > 0 && (
            <div className="selected-tags" ref={selectedTagsRef}>
                {selectedCountedTags.map((countedTag) => (
                    <Tag
                        key={countedTag.tag}
                        countedTag={countedTag}
                        isSelected={true}
                        onToggle={toggleTag}
                    />
                ))}
            </div>
        )}
    </>);
}
