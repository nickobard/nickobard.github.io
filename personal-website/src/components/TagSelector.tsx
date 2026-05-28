import {useEffect, useRef, useState} from "react";
import {usePortfolioContext} from "../context/PortfolioContext.tsx";
import Fuse from "fuse.js"
import './TagSelector.css'
import type {ExperienceNode} from "../types/portfolio.ts";

export function TagSelector() {

    const {experienceData} = usePortfolioContext();

    function flattenExperience(nodes: ExperienceNode[]): ExperienceNode[] {
        return nodes.flatMap((node) =>
            node.type === "folder"
                ? flattenExperience(node.children)
                : [node]
        );
    }

    const experienceDataFlat = flattenExperience(experienceData)

    const allTags = [...new Set(experienceDataFlat.flatMap((item) => item.tags))];
    const fuse = new Fuse(allTags, {
        threshold: 0.4,
    });


    const {selectedTags, toggleTag} = usePortfolioContext();

    const [tagQuery, setTagQuery] = useState("");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const visibleTags =
        tagQuery.trim() === ""
            ? allTags
            : fuse.search(tagQuery).map((result) => result.item);

    const inputAreaRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const selectedTagsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            const target = event.target as Node;

            const clickedInside = inputAreaRef.current?.contains(target) ||
                dropdownRef.current?.contains(target) ||
                selectedTagsRef.current?.contains(target);

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
                    {visibleTags.map((tag) => (
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


