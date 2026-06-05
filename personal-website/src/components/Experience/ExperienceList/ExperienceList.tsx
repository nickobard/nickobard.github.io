import type {ExperienceNode} from "../../../types/experienceNodes.ts";
import {flattenExperienceTree} from "../../../utils/flattenExperienceTree.ts";
import {ExperienceTreeItem} from "../ExperienceTree/ExperienceTreeItem.tsx";

export function ExperienceList({nodes}: { nodes: ExperienceNode[] }) {
    const flatItems = flattenExperienceTree(nodes);
    return (<>
        <div className="experience-list">
            {flatItems.map((item) => (
                <ExperienceTreeItem item={item}/>
            ))}
        </div>
    </>);
}