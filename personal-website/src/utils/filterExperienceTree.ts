import type {ExperienceNode} from "../types/ExperienceNode.ts";


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
                const allNodeTags = [...new Set([
                    ...(node.core_tags ?? []),
                    ...(node.secondary_tags ?? [])])];
                const matches = selectedTags.every((tag) => {
                        return allNodeTags.includes(tag);
                    }
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