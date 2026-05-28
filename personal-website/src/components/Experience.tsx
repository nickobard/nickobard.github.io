import type {ExperienceNode, ExperienceItem} from "../types/portfolio.ts";
import {filterExperienceTree} from "../utils/filterExperienceTree.ts"
import {useState} from "react";
import "./Experience.css"
import {usePortfolioContext} from "../context/PortfolioContext.tsx";
import {flattenExperienceTree} from "../utils/flattenExperienceTree.ts";

type Props = {
    nodes: ExperienceNode[];
    depth?: number;
};

function ExperienceItem({item}: { item: ExperienceItem }) {
    return (<details className="experience-item">
        <summary>{item.title}</summary>
        <p>{item.summary}</p>
        {item.details && (
            <ul>
                {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                ))}
            </ul>
        )}
    </details>);
}

function ExperienceTree({nodes, depth = 0}: Props) {

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

function ExperienceList({nodes}: { nodes: ExperienceNode[] }) {
    const flatItems = flattenExperienceTree(nodes);
    return (<>
        <div className="experience-list">
            {flatItems.map((item) => (
                <ExperienceItem item={item}/>
            ))}
        </div>
    </>);
}

export function Experience() {

    const [isFlatView, setIsFlatView] = useState(false);

    const {experienceData, selectedTags} = usePortfolioContext();

    const filteredExperienceData = filterExperienceTree(experienceData, selectedTags);


    return (<div className="experience-content">
        <label className="view-switch">
            <input
                type="checkbox"
                checked={isFlatView}
                onChange={(event) => setIsFlatView(event.target.checked)}
            />
            Flat view
        </label>
        {isFlatView ? (
            <ExperienceList nodes={filteredExperienceData}/>
        ) : (
            <ExperienceTree nodes={filteredExperienceData}/>
        )}

    </div>);
}