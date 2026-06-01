import type {ExperienceFolder, ExperienceNode} from "../../types/experienceNodes.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";
import './ExperienceTree.css'
import './ExperienceFolder.css'

export function ExperienceTree({nodes}: { nodes: ExperienceNode[] }) {

    return (
        <div className="experience-tree">
            {nodes.map((node) => (
                node.type === "folder" ? (
                    <div
                        key={`${node.title}/`}
                        className="experience-folder-wrapper"
                    >
                        <ExperienceFolder folderNode={node}
                                          depth={0}
                                          parentKey={`${node.title}`}/>
                    </div>
                ) : (
                    <div
                        key={`${node.title}`}
                        className="experience-item-wrapper top-level"
                    >
                        <ExperienceItem item={node}/>
                    </div>
                )
            ))}
        </div>
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
                    <div className="experience-folder-excerpt">
                        {folderNode.summary}
                    </div>
                )}
            </summary>

            {folderNode.description && (
                <p>{folderNode.description}</p>
            )}

            {folderNode.children.map((node) => (
                node.type === "folder" ? (
                    <div
                        key={`${parentKey}/${node.title}/`}
                        className="experience-folder-wrapper">
                        <ExperienceFolder folderNode={node}
                                          depth={depth + 1}
                                          parentKey={`${parentKey}/${node.title}`}/>

                    </div>
                ) : (
                    <div
                        key={`${parentKey}/${node.title}`}
                        className="experience-item-wrapper"
                    >
                        <ExperienceItem item={node}/>
                    </div>
                )
            ))}
        </details>
    )
}
