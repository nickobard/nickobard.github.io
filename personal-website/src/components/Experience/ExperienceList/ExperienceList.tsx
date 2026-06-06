import type {ExperienceNode} from "../../../types/experienceNodes.ts";
import {flattenExperienceTreeWithPath} from "../../../utils/flattenExperienceTree.ts";
import {ExperienceListItem} from "./ExperienceListItem.tsx";
import "./ExperienceList.css"
import {type ExperienceSortDirection, sortWithFixed} from "../../../utils/sortExperienceNodes.ts";
import {useMemo} from "react";

type Props = {
    nodes: ExperienceNode[];
    sortDirection?: ExperienceSortDirection;
};

export function ExperienceList({nodes, sortDirection = "desc"}: Props) {
    const flatItems = useMemo(
        () => sortWithFixed(
            flattenExperienceTreeWithPath(nodes),
            ({item}) => item,
            sortDirection
        ),
        [nodes, sortDirection]
    );

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
