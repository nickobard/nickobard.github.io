import type {ExperienceNode} from "../types/ExperienceNode.ts";

type Prioritized = {
    priority?: number;
};

function validPriority(priority?: number): number | undefined {
    return priority !== undefined && priority >= 0
        ? priority
        : undefined;
}

export function sortByPriority<T>(
    items: T[],
    getPrioritized: (item: T) => Prioritized
): T[] {
    return [...items].sort((a, b) => {
        const aPriority = validPriority(getPrioritized(a).priority);
        const bPriority = validPriority(getPrioritized(b).priority);

        if (aPriority !== undefined && bPriority === undefined) {
            return -1;
        }

        if (aPriority === undefined && bPriority !== undefined) {
            return 1;
        }

        if (aPriority === undefined || bPriority === undefined) {
            return 0;
        }

        return aPriority - bPriority;
    });
}

function sortNodeChildrenByPriority(node: ExperienceNode): ExperienceNode {
    if (node.type !== "folder") {
        return node;
    }

    return {
        ...node,
        children: sortExperienceNodesByPriority(node.children),
    };
}

export function sortExperienceNodesByPriority(
    nodes: ExperienceNode[]
): ExperienceNode[] {
    return sortByPriority(
        nodes.map(sortNodeChildrenByPriority),
        (node) => node
    );
}
