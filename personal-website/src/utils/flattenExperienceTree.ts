import type {ExperienceItem, ExperienceNode} from "../types/ExperienceNode.ts";

export type FlattenedExperienceItem = {
    item: ExperienceItem;
    path: string[];
};

export function flattenExperienceTree(nodes: ExperienceNode[]): ExperienceItem[] {
    return nodes.flatMap((node) =>
        node.type === "folder"
            ? flattenExperienceTree(node.children)
            : [node]
    );
}

export function flattenExperienceTreeWithPath(
    nodes: ExperienceNode[],
    path: string[] = []
): FlattenedExperienceItem[] {
    return nodes.flatMap((node) =>
        node.type === "folder"
            ? flattenExperienceTreeWithPath(node.children, [...path, node.title])
            : [{item: node, path}]
    );
}
