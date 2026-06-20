import type {ExperienceNodeBase} from "../types/ExperienceNode.ts";

type SortableExperienceInterval = {
    start_date?: string;
    end_date?: string;
};

export type ExperienceSortDirection = "asc" | "desc";

function dateValue(date?: string): number {
    return date ? new Date(date).getTime() : Number.POSITIVE_INFINITY;
}

export function compareExperienceIntervals(
    a: SortableExperienceInterval,
    b: SortableExperienceInterval
): number {
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

        return compareExperienceIntervals(aInterval, bInterval) * directionMultiplier;
    });
}

function sortNodeChildren(
    node: ExperienceNodeBase,
    direction: ExperienceSortDirection
): ExperienceNodeBase {
    if (node.type !== "folder") {
        return node;
    }

    return {
        ...node,
        children: sortExperienceNodesByInterval(node.children, direction),
    };
}

export function sortExperienceNodesByInterval(
    nodes: ExperienceNodeBase[],
    direction: ExperienceSortDirection = "asc"
): ExperienceNodeBase[] {
    return sortByInterval(
        nodes.map((node) => sortNodeChildren(node, direction)),
        (node) => node,
        direction
    );
}
