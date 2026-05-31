import type {ExperienceNode} from "../../types/experienceNodes.ts";
import {flattenExperienceTree} from "../../utils/flattenExperienceTree.ts";
import {ExperienceItem} from "./ExperienceItem.tsx";

export function ExperienceList({nodes}: { nodes: ExperienceNode[] }) {
    const flatItems = flattenExperienceTree(nodes);
    return (<>
        <div className="experience-list">
            {flatItems.map((item) => (
                <ExperienceItem item={item}/>
            ))}
        </div>
    </>);
}