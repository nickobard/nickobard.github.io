import type {ExperienceNode} from "../../../types/experienceNodes.ts";
import {ExperienceTreeItem} from "./ExperienceTreeItem.tsx";
import {useMemo} from "react";
import './ExperienceTree.css'
import {ExperienceContentTree} from "../../../models/ExperienceContentTree.ts";
import {ExperienceTreeFolder} from "./ExperienceTreeFolder.tsx";
import {type ExperienceSortDirection, sortExperienceNodes} from "../../../utils/sortExperienceNodes.ts";

type Props = {
    nodes: ExperienceNode[];
    sortDirection?: ExperienceSortDirection;
};

export function ExperienceTree({nodes, sortDirection = "desc"}: Props) {

    const sortedNodes = useMemo(
        () => sortExperienceNodes(nodes, sortDirection),
        [nodes, sortDirection]
    );

    const contentTree = useMemo(
        () => new ExperienceContentTree(),
        // The content tree mirrors the rendered node structure, so reset it when
        // filtering or other node changes replace the rendered tree.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sortedNodes]
    );

    return (
        <ul className="experience-tree top-level">
            {sortedNodes.map((node) => (
                node.type === "folder" ? (
                    <li
                        key={`${node.title}/`}
                        className="experience-folder-wrapper top-level"
                    >
                        <ExperienceTreeFolder parentContentNode={contentTree.root}
                                              folderNode={node}
                                              depth={0}
                                              index={`${node.title}`}
                                              sortDirection={sortDirection}/>
                    </li>
                ) : (
                    <li
                        key={`${node.title}`}
                        className="experience-item-wrapper top-level"
                    >
                        <ExperienceTreeItem item={node} parentContentNode={contentTree.root}/>
                    </li>
                )
            ))}
        </ul>
    );
}
