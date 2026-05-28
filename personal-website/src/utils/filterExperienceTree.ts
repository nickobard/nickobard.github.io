import type {ExperienceNode} from "../types/portfolio.ts";


export function filterExperienceTree(
    nodes: ExperienceNode[],
    selectedTags: string[]
): ExperienceNode[] {
    if (selectedTags.length === 0) {
        return nodes;
    }

    return nodes
        .map((node) => {
            if (node.type === "item") {
                const matches = selectedTags.every((tag) =>
                    node.tags.includes(tag)
                );

                return matches ? node : null;
            }

            const filteredChildren = filterExperienceTree(
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