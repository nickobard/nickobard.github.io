import {useEffect, useRef, useState} from "react";
import {useExperienceContext} from "../context/ExperienceContext.tsx";
import Fuse from "fuse.js"
import './TagSelector.css'
import {flattenExperienceTree} from "../utils/flattenExperienceTree.ts";
import {imputeExperienceTags} from "../utils/imputeTransitiveClosureTags.ts";
import {tagGraph} from "../data/tagTrees.ts";
import {countTags, sortCountedTags} from "../utils/countTags.ts";


export function TagSelector() {

    const {experienceData} = useExperienceContext();


    const experienceDataFlat = flattenExperienceTree(experienceData)

    const experienceDataFlatWithTagImputation = imputeExperienceTags(experienceDataFlat, tagGraph)
    const countedAllTags = sortCountedTags(countTags(experienceDataFlatWithTagImputation));

    const fuse = new Fuse(countedAllTags, {
        keys: ["tag"],
        threshold: 0.4,
    });


    const {selectedTags, toggleTag} = useExperienceContext();

    const [tagQuery, setTagQuery] = useState("");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const visibleTags =
        tagQuery.trim() === ""
            ? countedAllTags
            : fuse.search(tagQuery).map((result) => result.item);

    const inputAreaRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const selectedTagsRef = useRef<HTMLDivElement | null>(null);
    const {experienceViewControlsRef} = useExperienceContext();


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
    }, []);

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
                    {visibleTags.map(({tag}) => (
                        <button
                            key={tag}
                            type="button"
                            className={selectedTags.includes(tag) ? "tag active" : "tag"}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {selectedTags.length > 0 && (
            <div className="selected-tags" ref={selectedTagsRef}>
                {selectedTags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        className="selected-tag"
                        onClick={() => toggleTag(tag)}
                    >
                        {tag} ×
                    </button>
                ))}
            </div>
        )}
    </>);
}

