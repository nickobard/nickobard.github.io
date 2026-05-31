import type {ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import './ExperienceTree.css'

type Props = {
    nodes: ExperienceNode[];
    depth?: number;
    parentKey: string;
};

export function ExperienceTree({nodes, depth = 0, parentKey = ""}: Props) {

    return (
        <div className="experience-tree">
            {nodes.map((node) => (
                node.type === "folder" ? (
                    <div
                        key={`${parentKey}/${node.title}`}
                        className={depth === 0
                            ? "experience-folder-wrapper-top-level"
                            : "experience-folder-wrapper"}
                        style={{marginLeft: `${depth * 1.5}rem`}}
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
                            ? "experience-item-wrapper-top-level"
                            : "experience-item-wrapper"}
                        style={{marginLeft: `${depth * 1.5}rem`}}
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
