import {useState} from "react";
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


    return (<>

        <div className="tag-selector">
            <input
                className="tag-search"
                type="text"
                placeholder="Search tags..."
                value={tagQuery}
                onFocus={() => setIsTagDropdownOpen(true)}
                onChange={(event) => {
                    setTagQuery(event.target.value);
                    setIsTagDropdownOpen(true);
                }}
            />

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


