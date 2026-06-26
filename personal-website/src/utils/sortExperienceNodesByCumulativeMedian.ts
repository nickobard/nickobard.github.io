import type {ExperienceNode} from "../types/ExperienceNode.ts";
import type {ExperienceSortDirection} from "./sortExperienceNodesByInterval.ts";

type NodeWithDatePoints = {
    node: ExperienceNode;
    datePoints: number[];
    sortMedian: number;
};

function dateValue(date?: string): number | undefined {
    if (!date) {
        return undefined;
    }

    const value = new Date(date).getTime();

    return Number.isNaN(value) ? undefined : value;
}

function endDateValue(date?: string): number {
    return dateValue(date) ?? Number.POSITIVE_INFINITY;
}

function datePointsForNode(node: ExperienceNode): number[] {
    if (node.type === "folder") {
        return node.children.flatMap(datePointsForNode);
    }

    return [dateValue(node.start_date), endDateValue(node.end_date)]
        .filter((value): value is number => value !== undefined);
}

function median(values: number[]): number {
    if (values.length === 0) {
        return Number.POSITIVE_INFINITY;
    }

    const sortedValues = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 1) {
        return sortedValues[middle];
    }

    if (!Number.isFinite(sortedValues[middle])) {
        return Number.POSITIVE_INFINITY;
    }

    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
}

function compareByMedian(
    a: NodeWithDatePoints,
    b: NodeWithDatePoints,
    direction: ExperienceSortDirection
): number {
    const directionMultiplier = direction === "asc" ? 1 : -1;

    if (a.sortMedian < b.sortMedian) {
        return -1 * directionMultiplier;
    }

    if (a.sortMedian > b.sortMedian) {
        return directionMultiplier;
    }

    return a.node.title.localeCompare(b.node.title);
}

export function sortByCumulativeMedian<T>(
    items: T[],
    getNode: (item: T) => ExperienceNode,
    direction: ExperienceSortDirection
): T[] {
    const itemsWithDatePoints = items.map((item) => {
        const node = getNode(item);
        const datePoints = datePointsForNode(node);

        return {
            item,
            node,
            datePoints,
            sortMedian: median(datePoints),
        };
    });

    return itemsWithDatePoints
        .sort((a, b) => compareByMedian(a, b, direction))
        .map(({item}) => item);
}

function sortNodeWithDatePoints(
    node: ExperienceNode,
    direction: ExperienceSortDirection
): NodeWithDatePoints {
    if (node.type !== "folder") {
        const datePoints = datePointsForNode(node);

        return {
            node,
            datePoints,
            sortMedian: median(datePoints),
        };
    }

    const sortedChildren = sortExperienceNodesByCumulativeMedian(node.children, direction);
    const sortedNode = {
        ...node,
        children: sortedChildren,
    };
    const datePoints = datePointsForNode(sortedNode);

    return {
        node: sortedNode,
        datePoints,
        sortMedian: median(datePoints),
    };
}

export function sortExperienceNodesByCumulativeMedian(
    nodes: ExperienceNode[],
    direction: ExperienceSortDirection = "asc"
): ExperienceNode[] {
    return sortByCumulativeMedian(
        nodes.map((node) => sortNodeWithDatePoints(node, direction)),
        ({node}) => node,
        direction
    ).map(({node}) => node);
}
