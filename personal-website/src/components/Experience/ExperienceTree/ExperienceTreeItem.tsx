import type {ExperienceItem} from "../../../types/ExperienceNode.ts";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {ExperienceContentNode, ExperienceContentTree} from "../../../models/ExperienceContentTree.ts";
import "./ExperienceTreeItem.css";
import ReactMarkdown from "react-markdown";
import {dedent} from "ts-dedent";

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
                    <div className="experience-item-title-container">
                        <span>●</span>


                        <span className="experience-item-title">
                        {item.title}
                      </span>
                    </div>


                    <span className="experience-item-header-meta">
                        <span className="experience-item-date-label">
                            {item.date_label}
                        </span>

                        <span className={isOpen ? "experience-item-arrow open" : "experience-item-arrow"}>
                            ▶
                        </span>
                    </span>

                </div>

                {item.summary && (
                    <div className="experience-item-summary experience-item-padded-content">
                        <ReactMarkdown>{dedent(item.summary)}</ReactMarkdown>
                    </div>
                )}

            </button>

            <div className="details-content experience-item-padded-content"
                 style={{maxHeight: isOpen ? `${contentHeight ?? 0}px` : "0px"}}>
                <div ref={contentRef} className="details-content-inner">
                    {item.description && (
                        <div className="experience-item-description">
                            <ReactMarkdown>
                                {dedent(item.description)}
                            </ReactMarkdown>
                        </div>
                    )}

                    {item.details && (
                        <div className="details-list">
                            <ReactMarkdown>
                                {dedent(item.details)}
                            </ReactMarkdown>
                        </div>
                    )}

                    {item.postscriptum && (
                        <div className="experience-tree-item-postscriptum">
                            <ReactMarkdown>{dedent(item.postscriptum)}</ReactMarkdown>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
