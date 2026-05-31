import type {ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import './ExperienceTree.css'

type Props = {
    nodes: ExperienceNode[];
    depth?: number;
};

export function ExperienceTree({nodes, depth = 0}: Props) {

    return (
        <div className="experience-tree">
            {nodes.map((node) => (
                <div
                    key={node.title}
                    className="experience-node"
                    style={{marginLeft: `${depth * 1.5}rem`}}
                >
                    {node.type === "folder" ? (
                        <details open>
                            <summary>{node.title}</summary>
                            <ExperienceTree nodes={node.children} depth={depth + 1}/>
                        </details>
                    ) : (
                        <ExperienceItem item={node}/>
                    )}
                </div>
            ))}
        </div>
    );
}

// function ExperienceTreeFolderView({nodes, depth = 0}: Props) {
//     return (<></>)
// }
