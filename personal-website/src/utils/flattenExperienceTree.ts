import type {ExperienceItem, ExperienceNode} from "../types/portfolio.ts";

export function flattenExperienceTree(nodes: ExperienceNode[]): ExperienceItem[] {
    return nodes.flatMap((node) =>
        node.type === "folder"
            ? flattenExperienceTree(node.children)
            : [node]
    );
}