import {imputeParentTags} from "./imputeParentTags.ts";
import type {ExperienceItem, ExperienceNode} from "../types/ExperienceNode.ts";
import type {TagGraph} from "../types/TagGraph.ts";

function imputeExperienceItemTags(
    item: ExperienceItem,
    tagGraph: TagGraph
): ExperienceItem {
    const coreTags = item.core_tags ?? [];
    const secondaryTags = item.secondary_tags ?? [];

    const tagsImputedFromCoreTags = new Set(
        coreTags.flatMap((tag) => imputeParentTags(tagGraph, tag))
    );

    const tagsImputedFromSecondaryTags = new Set(
        secondaryTags.flatMap((tag) => imputeParentTags(tagGraph, tag))
    );

    return {
        ...item,

        core_tags: coreTags,

        secondary_tags: [
            ...new Set([
                ...secondaryTags,
                ...tagsImputedFromCoreTags,
            ]),
        ],

        minor_tags: [
            ...new Set([
                ...(item.minor_tags ?? []),
                ...tagsImputedFromSecondaryTags,
            ]),
        ],
    };
}

export function imputeExperienceItemsTags(
    items: ExperienceItem[],
    tagGraph: TagGraph
): ExperienceItem[] {
    return items.map((item) => imputeExperienceItemTags(item, tagGraph));
}

export function imputeExperienceTreeTags(
    nodes: ExperienceNode[],
    tagGraph: TagGraph
): ExperienceNode[] {
    return nodes.map((node) => {
        if (node.type === "item") {
            return imputeExperienceItemTags(node, tagGraph);
        }

        return {
            ...node,
            children: imputeExperienceTreeTags(node.children, tagGraph),
        };
    });
}
