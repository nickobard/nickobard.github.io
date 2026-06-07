import type {ExperienceNode} from "../types/experienceNodes.ts";
import type {ExperienceSortDirection} from "./sortExperienceNodesByInterval.ts";

type NodeWithDatePoints = {
    node: ExperienceNode;
    datePoints: number[];
    sortMedian: number;
};

function dateValue(date?: string): number | undefined {
    return date ? new Date(date).getTime() : undefined;
}

function datePointsForNode(node: ExperienceNode): number[] {
    if (node.type === "folder") {
        return node.children.flatMap(datePointsForNode);
    }

    return [dateValue(node.start_date), dateValue(node.end_date)]
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

    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
}

function compareByMedian(
    a: NodeWithDatePoints,
    b: NodeWithDatePoints,
    direction: ExperienceSortDirection
): number {
    const directionMultiplier = direction === "asc" ? 1 : -1;
    const medianDiff = a.sortMedian - b.sortMedian;

    if (medianDiff !== 0) {
        return medianDiff * directionMultiplier;
    }

    return a.node.title.localeCompare(b.node.title);
}

function sortWithFixedMedianPositions(
    nodesWithDatePoints: NodeWithDatePoints[],
    direction: ExperienceSortDirection
): NodeWithDatePoints[] {
    const flexibleSorted = nodesWithDatePoints
        .filter(({node}) => node.position !== "fixed")
        .sort((a, b) => compareByMedian(a, b, direction));

    let flexIndex = 0;

    return nodesWithDatePoints.map((nodeWithDatePoints) => {
        if (nodeWithDatePoints.node.position === "fixed") {
            return nodeWithDatePoints;
        }

        return flexibleSorted[flexIndex++];
    });
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
    return sortWithFixedMedianPositions(
        nodes.map((node) => sortNodeWithDatePoints(node, direction)),
        direction
    ).map(({node}) => node);
}
