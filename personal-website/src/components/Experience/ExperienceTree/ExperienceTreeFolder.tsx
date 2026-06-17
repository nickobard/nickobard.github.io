import type {ExperienceFolder} from "../../../types/experienceNodes.ts";
import {ExperienceTreeItem} from "./ExperienceTreeItem.tsx";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import './ExperienceTree.css'
import './ExperienceTreeFolder.css'
import {ExperienceContentNode, ExperienceContentTree} from "../../../models/ExperienceContentTree.ts";
import type {ExperienceSortDirection} from "../../../utils/sortExperienceNodesByInterval.ts";
import {sortExperienceNodesByCumulativeMedian} from "../../../utils/sortExperienceNodesByCumulativeMedian.ts";


type Props = {
    parentContentNode: ExperienceContentNode;
    folderNode: ExperienceFolder;
    depth: number;
    index: string;
    sortDirection?: ExperienceSortDirection;

};


export function ExperienceTreeFolder({
                                         parentContentNode,
                                         folderNode,
                                         depth,
                                         index,
                                         sortDirection = "asc"
                                     }: Props) {

    const [isOpen, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState<number>();
    const sortedChildren = useMemo(
        () => sortExperienceNodesByCumulativeMedian(folderNode.children, sortDirection),
        [folderNode.children, sortDirection]
    );

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
                      <span className="experience-folder-title-marker">/</span>
                  </span>

                    <span className="experience-folder-header-meta">
                        {folderNode.date_label && (
                            <span className="experience-folder-date-label">
                                {folderNode.date_label}
                            </span>
                        )}

                        <span className={isOpen ? "experience-folder-arrow open" : "experience-folder-arrow"}>
                            ▶
                        </span>
                    </span>
                </div>

                {folderNode.summary && (
                    <div className="experience-folder-summary">
                        {folderNode.summary}
                    </div>
                )}
            </button>

            <div className="folder-details-content"
                 style={{maxHeight: isOpen ? `${contentHeight ?? 0}px` : "0px"}}>
                <div ref={contentRef} className="folder-details-content-inner">

                    {folderNode.description && (
                        <p className={"experience-folder-description"}>{folderNode.description}</p>
                    )}


                    <ul className="experience-tree">
                        {sortedChildren.map((node) => (
                            node.type === "folder" ? (
                                <li
                                    key={`${index}/${node.title}/`}
                                    className="experience-folder-wrapper">
                                    <ExperienceTreeFolder parentContentNode={experienceContentNode}
                                                          folderNode={node}
                                                          depth={depth + 1}
                                                          index={`${index}/${node.title}`}
                                                          sortDirection={sortDirection}
                                    />

                                </li>
                            ) : (
                                <li
                                    key={`${index}/${node.title}`}
                                    className="experience-item-wrapper"
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
