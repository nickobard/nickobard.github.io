import type {ExperienceFolder, ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import {useEffect, useRef, useState} from "react";
import './ExperienceTree.css'
import './ExperienceFolder.css'

export function ExperienceTree({nodes}: { nodes: ExperienceNode[] }) {

    return (
        <ul className="experience-tree top-level">
            {nodes.map((node) => (
                node.type === "folder" ? (
                    <li
                        key={`${node.title}/`}
                        className="experience-folder-wrapper top-level"
                    >
                        <ExperienceFolder folderNode={node}
                                          depth={0}
                                          parentKey={`${node.title}`}/>
                    </li>
                ) : (
                    <li
                        key={`${node.title}`}
                        className="experience-item-wrapper top-level"
                    >
                        <ExperienceItem item={node}/>
                    </li>
                )
            ))}
        </ul>
    );
}

type ExperienceFolderProps = {
    folderNode: ExperienceFolder;
    depth: number;
    parentKey: string;
};

function ExperienceFolder({folderNode, depth, parentKey}: ExperienceFolderProps) {

    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState<number>();

    useEffect(() => {
        const element = contentRef.current;

        if (!element) return;

        const observer = new ResizeObserver(() => {
            setContentHeight(element.scrollHeight);
        });

        observer.observe(element);

        setContentHeight(element.scrollHeight);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="experience-folder">
            <button
                type="button"
                className="experience-folder-summary-button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className="experience-folder-header">
                  <span className="experience-folder-title">
                    {folderNode.title}
                  </span>

                    <span className={isOpen ? "experience-folder-arrow open" : "experience-folder-arrow"}>
                        ▶
                    </span>
                </div>

                {folderNode.summary && (
                    <div className="experience-folder-summary">
                        {folderNode.summary}
                    </div>
                )}
            </button>

            <div className="details-content"
                 style={{maxHeight: isOpen ? `${contentHeight ?? 0}px` : "0px"}}>
                <div ref={contentRef} className="details-content-inner">

                    {folderNode.description && (
                        <p className={"experience-folder-description"}>{folderNode.description}</p>
                    )}


                    <ul className="experience-tree">
                        {folderNode.children.map((node) => (
                            node.type === "folder" ? (
                                <li
                                    key={`${parentKey}/${node.title}/`}
                                    className="experience-folder-wrapper">
                                    <ExperienceFolder folderNode={node}
                                                      depth={depth + 1}
                                                      parentKey={`${parentKey}/${node.title}`}/>

                                </li>
                            ) : (
                                <li
                                    key={`${parentKey}/${node.title}`}
                                    className="experience-item-wrapper with-bullet"
                                >
                                    <ExperienceItem item={node}/>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
