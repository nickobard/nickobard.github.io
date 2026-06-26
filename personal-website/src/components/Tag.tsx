import type {CountedTag} from "../utils/countTags.ts";
import "./Tag.css";

type TagProps = {
    countedTag: CountedTag;
    isSelected: boolean;
    onToggle: (tag: string) => void;
};

export function Tag({countedTag, isSelected, onToggle}: TagProps) {
    return (
        <button
            type="button"
            className={isSelected ? "tag active" : "tag"}
            onClick={() => onToggle(countedTag.tag)}
        >
            <span className="tag-label">{countedTag.tag}</span>
            <span className="tag-count">{countedTag.count}</span>
        </button>
    );
}
