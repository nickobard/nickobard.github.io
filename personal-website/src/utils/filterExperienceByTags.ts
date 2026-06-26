import type {ExperienceItem, ExperienceNode} from "../types/ExperienceNode.ts";

function getFilterableTags(item: ExperienceItem, includeMinorTags = false): string[] {
    const tags = [
        ...(item.core_tags ?? []),
        ...(item.secondary_tags ?? []),
    ];

    if (includeMinorTags) {
        tags.push(...(item.minor_tags ?? []));
    }

    return [...new Set(tags)];
}


export function filterExperienceByTags(
    nodes: ExperienceNode[],
    selectedTags: string[]
): ExperienceNode[] {
    if (selectedTags.length === 0) {
        return nodes;
    }

    return nodes
        .map((node) => {
            if (node.type === "item") {
                const allNodeTags = getFilterableTags(node, true);
                const matches = selectedTags.every((tag) => {
                        return allNodeTags.includes(tag);
                    }
                );

                return matches ? node : null;
            }

            const filteredChildren = filterExperienceByTags(
                node.children,
                selectedTags
            );

            if (filteredChildren.length === 0) {
                return null;
            }

            return {
                ...node,
                children: filteredChildren,
            };
        })
        .filter((node): node is ExperienceNode => node !== null);
}

export function filterExperienceItemsByTags(
    items: ExperienceItem[],
    selectedTags: string[]
): ExperienceItem[] {
    if (selectedTags.length === 0) {
        return items;
    }

    return items.filter((item) => {
        const allItemTags = getFilterableTags(item, true);

        return selectedTags.every((tag) => allItemTags.includes(tag));
    });
}
