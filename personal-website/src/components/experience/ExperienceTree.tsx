import type {ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import './ExperienceTree.css'

type Props = {
    nodes: ExperienceNode[];
    depth?: number;
    parentKey?: string;
};

export function ExperienceTree({nodes, depth = 0, parentKey = ""}: Props) {

    return (
        <div className="experience-tree">
            {nodes.map((node) => (
                node.type === "folder" ? (
                    <div
                        key={`${parentKey}/${node.title}`}
                        className="experience-folder-wrapper"
                    >
                        <details>
                            <summary>{node.title}</summary>
                            <ExperienceTree nodes={node.children}
                                            depth={depth + 1}
                                            parentKey={`${parentKey}/${node.title}`}/>
                        </details>
                    </div>
                ) : (
                    <div
                        key={`${parentKey}/${node.title}`}
                        className={depth === 0
                            ? "experience-item-wrapper top-level"
                            : "experience-item-wrapper"}
                    >
                        <ExperienceItem item={node}/>
                    </div>
                )


            ))}
        </div>
    );
}

// function ExperienceTreeFolderView({nodes, depth = 0}: Props) {
//     return (<></>)
// }
