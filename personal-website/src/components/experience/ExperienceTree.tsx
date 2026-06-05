import type {ExperienceFolder, ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import './ExperienceTree.css'
import './ExperienceFolder.css'
import {ExperienceContentNode, ExperienceContentTree} from "../../models/ExperienceContentTree.ts";


export function ExperienceTree({nodes}: { nodes: ExperienceNode[] }) {
    console.log("ExperienceTree render");
    const contentTree = useMemo(
        () => new ExperienceContentTree(),
        // The content tree mirrors the rendered node structure, so reset it when
        // filtering or other node changes replace the rendered tree.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [nodes]
    );

    return (
        <ul className="experience-tree top-level">
            {nodes.map((node) => (
                node.type === "folder" ? (
                    <li
                        key={`${node.title}/`}
                        className="experience-folder-wrapper top-level"
                    >
                        <ExperienceFolder parentContentNode={contentTree.root}
                                          folderNode={node}
                                          depth={0}
                                          index={`${node.title}`}/>
                    </li>
                ) : (
                    <li
                        key={`${node.title}`}
                        className="experience-item-wrapper top-level"
                    >
                        <ExperienceItem item={node} parentContentNode={contentTree.root}/>
                    </li>
                )
            ))}
        </ul>
    );
}

type ExperienceFolderProps = {
    parentContentNode: ExperienceContentNode;
    folderNode: ExperienceFolder;
    depth: number;
    index: string;

};


function ExperienceFolder({
                              parentContentNode,
                              folderNode,
                              depth,
                              index
                          }: ExperienceFolderProps) {

    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState<number>();

    const experienceContentNode = useMemo(() =>
        new ExperienceContentNode('folder',
            parentContentNode,
            contentRef,
            setContentHeight),  [parentContentNode]
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
                                    <ExperienceFolder parentContentNode={experienceContentNode}
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
                                    <ExperienceItem item={node} parentContentNode={experienceContentNode}/>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
