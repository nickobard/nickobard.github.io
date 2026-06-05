import type {ExperienceFolder} from "../../../types/experienceNodes.ts";
import {ExperienceTreeItem} from "./ExperienceTreeItem.tsx";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import './ExperienceTree.css'
import './ExperienceTreeFolder.css'
import {ExperienceContentNode, ExperienceContentTree} from "../../../models/ExperienceContentTree.ts";


type Props = {
    parentContentNode: ExperienceContentNode;
    folderNode: ExperienceFolder;
    depth: number;
    index: string;

};


export function ExperienceTreeFolder({
                                     parentContentNode,
                                     folderNode,
                                     depth,
                                     index
                                 }: Props) {

    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState<number>();

    const experienceContentNode = useMemo(() =>
        new ExperienceContentNode('folder',
            parentContentNode,
            contentRef,
            setContentHeight), [parentContentNode]
    );

    useEffect(() => {
        parentContentNode.addChild(experienceContentNode);
    }, [parentContentNode, experienceContentNode]);

    useLayoutEffect(() => {
        if (!contentRef.current) {
            return;
        }
        ExperienceContentTree.updateTreeContentHeight(experienceContentNode);
    }, [isOpen, experienceContentNode]);

    return (
        <div className="experience-folder">
            <button
                type="button"
                className="experience-folder-summary-button"
                onClick={() => setOpen((prev) => !prev)}
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
                                    key={`${index}/${node.title}/`}
                                    className="experience-folder-wrapper">
                                    <ExperienceTreeFolder parentContentNode={experienceContentNode}
                                                          folderNode={node}
                                                          depth={depth + 1}
                                                          index={`${index}/${node.title}`}
                                    />

                                </li>
                            ) : (
                                <li
                                    key={`${index}/${node.title}`}
                                    className="experience-item-wrapper with-bullet"
                                >
                                    <ExperienceTreeItem item={node} parentContentNode={experienceContentNode}/>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
