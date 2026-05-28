import type {ExperienceNode, ExperienceItem} from "../types/portfolio.ts";
import "./Experience.css"
import {usePortfolioContext} from "../context/PortfolioContext.tsx";

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

// function ExperienceList() {
//     return(<>
//     </>);
// }

export function Experience() {

    const {experienceData} = usePortfolioContext();

    return (<div className="experience-content">
        <ExperienceTree nodes={experienceData}/>
    </div>);
}