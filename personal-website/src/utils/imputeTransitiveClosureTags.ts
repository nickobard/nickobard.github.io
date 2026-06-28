import {imputeParentTags} from "./imputeParentTags.ts";
import type {ExperienceItem, ExperienceNode} from "../types/ExperienceNode.ts";
import {combineTagGraphs, tagGraphsLocator} from "../data/tags/tagGraphsLocator.ts";

function imputeExperienceItemTags(
    item: ExperienceItem
): ExperienceItem {
    const coreTags = item.core_tags ?? [];
    const secondaryTags = item.secondary_tags ?? [];

    const tagGraph = combineTagGraphs(item.tags_scopes, tagGraphsLocator);

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
): ExperienceItem[] {
    return items.map((item) => imputeExperienceItemTags(item));
}

export function imputeExperienceTreeTags(
    nodes: ExperienceNode[]
): ExperienceNode[] {
    return nodes.map((node) => {
        if (node.type === "item") {
            return imputeExperienceItemTags(node);
        }

        return {
            ...node,
            children: imputeExperienceTreeTags(node.children),
        };
    });
}
