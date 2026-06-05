import type {ExperienceNode} from "../../../types/experienceNodes.ts";
import {flattenExperienceTreeWithPath} from "../../../utils/flattenExperienceTree.ts";
import {ExperienceListItem} from "./ExperienceListItem.tsx";
import "./ExperienceList.css"

export function ExperienceList({nodes}: { nodes: ExperienceNode[] }) {
    const flatItems = flattenExperienceTreeWithPath(nodes);
    return (<>
        <div className="experience-list">
            {flatItems.map(({item, path}) => (
                <div className="experience-list-item" key={`${path.join("/")}/${item.title}`}>
                    <ExperienceListItem item={item} originPath={path}/>
                </div>
            ))}
        </div>
    </>);
}
