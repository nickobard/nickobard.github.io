import type {CountedTag} from "../utils/countTags.ts";
import "./Tag.css";
import {round} from "../utils/math.ts";

type TagProps = {
    countedTag: CountedTag;
    isSelected: boolean;
    onToggle: (tag: string) => void;
};

export function Tag({countedTag, isSelected, onToggle}: TagProps) {
    const countLabel = String(round(countedTag.count, 1));
    const countFontSize = countLabel.length <= 2
        ? "0.75rem"
        : countLabel.length === 3
            ? "0.62rem"
            : "0.5rem";

    return (
        <button
            type="button"
            className={isSelected ? "tag active" : "tag"}
            onClick={() => onToggle(countedTag.tag)}
        >
            <span className="tag-label">{countedTag.tag}</span>
            <span className="tag-count" style={{fontSize: countFontSize}}>{countLabel}</span>
        </button>
    );
}
