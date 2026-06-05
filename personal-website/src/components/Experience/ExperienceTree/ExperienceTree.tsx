import type {ExperienceNode} from "../../../types/experienceNodes.ts";
import {ExperienceTreeItem} from "./ExperienceTreeItem.tsx";
import {useMemo} from "react";
import './ExperienceTree.css'
import {ExperienceContentTree} from "../../../models/ExperienceContentTree.ts";
import {ExperienceTreeFolder} from "./ExperienceTreeFolder.tsx";

export function ExperienceTree({nodes}: { nodes: ExperienceNode[] }) {

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
                        <ExperienceTreeFolder parentContentNode={contentTree.root}
                                              folderNode={node}
                                              depth={0}
                                              index={`${node.title}`}/>
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
