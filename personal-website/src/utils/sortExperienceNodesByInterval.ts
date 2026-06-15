import type {ExperienceNode} from "../types/experienceNodes.ts";

type SortableExperienceInterval = {
    start_date?: string;
    end_date?: string;
    priority?: number;
};

export type ExperienceSortDirection = "asc" | "desc";

function dateValue(date?: string): number {
    return date ? new Date(date).getTime() : Number.POSITIVE_INFINITY;
}

function priorityValue(priority?: number): number {
    return priority !== undefined && priority >= 0
        ? priority
        : Number.NEGATIVE_INFINITY;
}

function comparePriority(a: SortableExperienceInterval, b: SortableExperienceInterval): number {
    const aPriority = priorityValue(a.priority);
    const bPriority = priorityValue(b.priority);
    const aHasPriority = Number.isFinite(aPriority);
    const bHasPriority = Number.isFinite(bPriority);

    if (aHasPriority && !bHasPriority) {
        return -1;
    }

    if (!aHasPriority && bHasPriority) {
        return 1;
    }

    if (!aHasPriority && !bHasPriority) {
        return 0;
    }

    return aPriority - bPriority;
}

export function compareExperienceIntervals(
    a: SortableExperienceInterval,
    b: SortableExperienceInterval
): number {
    const priorityDiff = comparePriority(a, b);
    if (priorityDiff !== 0) {
        return priorityDiff;
    }

    const startDiff = dateValue(a.start_date) - dateValue(b.start_date);
    if (startDiff !== 0) {
        return startDiff;
    }

    return dateValue(a.end_date) - dateValue(b.end_date);
}

export function sortByInterval<T>(
    items: T[],
    getInterval: (item: T) => SortableExperienceInterval,
    direction: ExperienceSortDirection = "asc"
): T[] {
    const directionMultiplier = direction === "asc" ? 1 : -1;

    return [...items].sort((a, b) => {
        const aInterval = getInterval(a);
        const bInterval = getInterval(b);
        const priorityDiff = comparePriority(aInterval, bInterval);

        if (priorityDiff !== 0) {
            return priorityDiff;
        }

        return compareExperienceIntervals(aInterval, bInterval) * directionMultiplier;
    });
}

function sortNodeChildren(
    node: ExperienceNode,
    direction: ExperienceSortDirection
): ExperienceNode {
    if (node.type !== "folder") {
        return node;
    }

    return {
        ...node,
        children: sortExperienceNodesByInterval(node.children, direction),
    };
}

export function sortExperienceNodesByInterval(
    nodes: ExperienceNode[],
    direction: ExperienceSortDirection = "asc"
): ExperienceNode[] {
    return sortByInterval(
        nodes.map((node) => sortNodeChildren(node, direction)),
        (node) => node,
        direction
    );
}
