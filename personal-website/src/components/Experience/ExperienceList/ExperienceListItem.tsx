import type {ExperienceItem} from "../../../types/experienceNodes.ts";
import {useLayoutEffect, useRef, useState} from "react";
import "./ExperienceListItem.css"

type Props = {
    item: ExperienceItem;
    originPath: string[];
};

export function ExperienceListItem({item, originPath}: Props) {
    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useLayoutEffect(() => {
        setContentHeight(contentRef.current?.scrollHeight ?? 0);
    }, [isOpen, item.description, item.details]);

    return (
        <div className="experience-list-item-content">
            <button
                type="button"
                className="experience-list-item-summary-button"
                onClick={() => setOpen((prev) => !prev)}
            >
                {originPath.length > 0 && (
                    <div className="experience-list-item-origin">
                        {originPath.join(" / ")} /
                    </div>
                )}

                <div className="experience-list-item-header">
                    <span className="experience-list-item-title">
                        {item.title}
                    </span>

                    <span className={isOpen ? "experience-list-item-arrow open" : "experience-list-item-arrow"}>
                        ▶
                    </span>
                </div>

                {item.summary && (
                    <div className="experience-list-item-summary">
                        {item.summary}
                    </div>
                )}
            </button>

            <div
                className="experience-list-item-details"
                style={{maxHeight: isOpen ? `${contentHeight}px` : "0px"}}
            >
                <div ref={contentRef} className="experience-list-item-details-inner">
                    {item.description && (
                        <p className="experience-list-item-description">{item.description}</p>
                    )}

                    {item.details && (
                        <ul className="experience-list-item-details-list">
                            {item.details.map((detail) => (
                                <li className="experience-list-item-details-list-entry" key={detail}>
                                    <span className="experience-list-item-details-list-text">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
