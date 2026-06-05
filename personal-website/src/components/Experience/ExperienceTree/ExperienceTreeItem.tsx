import type {ExperienceItem} from "../../../types/experienceNodes.ts";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {ExperienceContentNode, ExperienceContentTree} from "../../../models/ExperienceContentTree.ts";
import "./ExperienceTreeItem.css"

type ExperienceItemProps = {
    item: ExperienceItem;
    parentContentNode?: ExperienceContentNode;
};

export function ExperienceTreeItem({item, parentContentNode}: ExperienceItemProps) {
    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState<number>();
    const standaloneContentTree = useMemo(
        () => new ExperienceContentTree(),
        []
    );
    const contentParentNode = parentContentNode ?? standaloneContentTree.root;

    const experienceContentNode = useMemo(() =>
        new ExperienceContentNode('item',
            contentParentNode,
            contentRef,
            setContentHeight), [contentParentNode]
    );

    useEffect(() => {
        contentParentNode.addChild(experienceContentNode);
    }, [contentParentNode, experienceContentNode]);

    useLayoutEffect(() => {
        if (!contentRef.current) {
            return;
        }
        ExperienceContentTree.updateTreeContentHeight(experienceContentNode);
    }, [isOpen, experienceContentNode]);

    return (<div className="experience-item">
            <button
                type="button"
                className="experience-item-summary-button"
                onClick={() => setOpen((prev) => !prev)}
            >
                <div className="experience-item-header">
                      <span className="experience-item-title">
                        {item.title}
                      </span>

                    <span className={isOpen ? "experience-item-arrow open" : "experience-item-arrow"}>
                        ▶
                    </span>
                </div>

                <div className="experience-item-summary">
                    {item.summary}
                </div>
            </button>

            <div className="details-content"
                 style={{maxHeight: isOpen ? `${contentHeight ?? 0}px` : "0px"}}>
                <div ref={contentRef} className="details-content-inner experience-item-content-inner">
                    {item.description && (
                        <p className="experience-item-description">{item.description}</p>
                    )}

                    {item.details && (
                        <ul className="details-list">
                            {item.details.map((detail) => (
                                <li className="details-list-item" key={detail}>
                                    <span className="details-list-item-text">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
