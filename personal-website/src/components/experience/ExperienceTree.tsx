import type {ExperienceFolder, ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import {type RefObject, useLayoutEffect, useMemo, useRef, useState} from "react";
import './ExperienceTree.css'
import './ExperienceFolder.css'


type FolderRef = {
    contentRef: RefObject<HTMLDivElement | null>;
    setContentHeight: (height: number) => void;
};

type NodeId = string;

type TreeIndex = {
    parentById: Map<NodeId, NodeId | null>;
    childrenById: Map<NodeId, NodeId[]>;
};

function getAncestors(id: NodeId, parentById: Map<NodeId, NodeId | null>) {
    const ancestors: NodeId[] = [];

    let current = parentById.get(id) ?? null;

    while (current !== null) {
        ancestors.push(current);
        current = parentById.get(current) ?? null;
    }

    return ancestors;
}

export function buildTreeIndex(nodes: ExperienceNode[]): TreeIndex {
    const index: TreeIndex = {
        parentById: new Map(),
        childrenById: new Map(),
    };

    fillTreeIndex(nodes, null, index);

    return index;
}

function fillTreeIndex(
    nodes: ExperienceNode[],
    parentId: string | null,
    index: TreeIndex
) {
    for (const node of nodes) {
        const id = parentId === null ? node.title : `${parentId}/${node.title}`;

        index.parentById.set(id, parentId);

        if (node.type === "folder") {

            const childIds = node.children.map((child) => `${id}/${child.title}`);

            index.childrenById.set(id, childIds);

            fillTreeIndex(node.children, id, index);
        }
    }
}

function updateAllHeightsInTree(
    ids: NodeId[],
    folderRefs: RefObject<Map<string, FolderRef>>,
    lastChangedId: string
) {
    const lastChangedFolder = folderRefs.current?.get(lastChangedId)
    if (lastChangedFolder === undefined) {
        return;
    }
    if (lastChangedFolder.contentRef === null) {
        return;
    }
    if (lastChangedFolder.contentRef.current === null) {
        return;
    }
    const lastChangedFolderScrollHeight = lastChangedFolder?.contentRef.current.scrollHeight

    lastChangedFolder?.setContentHeight(lastChangedFolderScrollHeight)
    for (const id of ids) {
        if (lastChangedId === id) {
            continue;
        }
        const folderRef = folderRefs.current?.get(id);

        if (!folderRef) {
            continue;
        }
        if (folderRef.contentRef.current === null) {
            continue;
        }

        const height = folderRef.contentRef.current.scrollHeight;
        folderRef.setContentHeight(height + lastChangedFolderScrollHeight);
    }
}

export function ExperienceTree({nodes}: { nodes: ExperienceNode[] }) {

    const [lastChangedId, setLastChangedId] = useState<string | null>(null);
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const treeIndex = useMemo(() => {
        return buildTreeIndex(nodes);
    }, [nodes]);

    const folderRefs = useRef<Map<NodeId, FolderRef>>(new Map());

    useLayoutEffect(() => {
        if (!lastChangedId) return;

        const idsToUpdate = [
            lastChangedId,
            ...getAncestors(lastChangedId, treeIndex.parentById),
        ];

        updateAllHeightsInTree(idsToUpdate, folderRefs, lastChangedId);
    }, [openIds, lastChangedId]);

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
                                          index={`${node.title}`}
                                          openIds={openIds}
                                          setOpenIds={setOpenIds}
                                          folderRefs={folderRefs}
                                          setLastChangedId={setLastChangedId}/>
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
    index: NodeId;
    openIds: Set<NodeId>;
    setOpenIds: React.Dispatch<React.SetStateAction<Set<string>>>;
    folderRefs: RefObject<Map<NodeId, FolderRef>>;
    setLastChangedId: (id: string) => void;
};


function ExperienceFolder({
                              folderNode,
                              depth,
                              index,
                              openIds,
                              setOpenIds,
                              folderRefs,
                              setLastChangedId
                          }: ExperienceFolderProps) {

    const isOpen = openIds.has(index);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState<number>();

    const toggleFolder = (id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });

        setLastChangedId(id);
    };

    useLayoutEffect(() => {
        if (!contentRef.current) {
            return;
        }

        folderRefs.current.set(index, {
            contentRef: contentRef,
            setContentHeight,
        });

        return () => {
            folderRefs.current.delete(index);
        };
    }, [index, folderRefs]);

    return (
        <div className="experience-folder">
            <button
                type="button"
                className="experience-folder-summary-button"
                onClick={() => toggleFolder(index)}
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
                                    <ExperienceFolder folderNode={node}
                                                      depth={depth + 1}
                                                      index={`${index}/${node.title}`}
                                                      openIds={openIds}
                                                      setOpenIds={setOpenIds}
                                                      folderRefs={folderRefs}
                                                      setLastChangedId={setLastChangedId}
                                    />

                                </li>
                            ) : (
                                <li
                                    key={`${index}/${node.title}`}
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
