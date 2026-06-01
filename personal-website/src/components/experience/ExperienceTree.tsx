import type {ExperienceFolder, ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import './ExperienceTree.css'
import './ExperienceFolder.css'

export function ExperienceTree({nodes}: { nodes: ExperienceNode[] }) {

    return (
        <ul className="experience-tree top-level">
            {nodes.map((node) => (
                node.type === "folder" ? (
                    <li
                        key={`${node.title}/`}
                        className="experience-folder-wrapper"
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
    return (
        <details className="experience-folder">
            <summary>
                <div className="experience-folder-header">
                  <span className="experience-folder-title">
                    {folderNode.title}
                  </span>

                    <span className="experience-folder-arrow">
                        ▶
                    </span>
                </div>

                {folderNode.summary && (
                    <div className="experience-folder-summary">
                        {folderNode.summary}
                    </div>
                )}
            </summary>

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
        </details>
    )
}
