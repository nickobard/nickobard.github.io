import type {ExperienceNode} from "../types/experienceNodes.ts";

type SortableExperienceInterval = {
    position: "fixed" | "flexible";
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

export function sortWithFixed<T>(
    items: T[],
    getInterval: (item: T) => SortableExperienceInterval,
    direction: ExperienceSortDirection = "asc"
): T[] {
    const directionMultiplier = direction === "asc" ? 1 : -1;
    const flexibleSorted = items
        .filter((item) => getInterval(item).position !== "fixed")
        .sort((a, b) => (
            compareExperienceIntervals(getInterval(a), getInterval(b)) * directionMultiplier
        ));

    let flexIndex = 0;

    return items.map((item) => {
        if (getInterval(item).position === "fixed") {
            return item;
        }

        return flexibleSorted[flexIndex++];
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
    return sortWithFixed(
        nodes.map((node) => sortNodeChildren(node, direction)),
        (node) => node,
        direction
    );
}
