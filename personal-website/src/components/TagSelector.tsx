import {useEffect, useRef, useState} from "react";
import {portfolioItems} from "../data/portfolioItems.ts";
import {usePortfolioContext} from "../context/PortfolioContext.tsx";
import './TagSelector.css'

export function TagSelector() {

    const allTags = [...new Set(portfolioItems.flatMap((item) => item.tags))];

    const {selectedTags, toggleTag} = usePortfolioContext();

    const [tagQuery, setTagQuery] = useState("");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const visibleTags =
        tagQuery.trim() === ""
            ? allTags
            : allTags.filter((tag) =>
                tag.toLowerCase().includes(tagQuery.toLowerCase())
            );

    const tagSelectorRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tagSelectorRef.current &&
                !tagSelectorRef.current.contains(event.target as Node)
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

        <div className="tag-selector" ref={tagSelectorRef}>
            <div>
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
                <div className="tag-dropdown">
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
    </>);
}


