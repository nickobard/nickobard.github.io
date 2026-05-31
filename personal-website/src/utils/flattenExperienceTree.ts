import type {ExperienceItem, ExperienceNode} from "../types/experienceNodes.ts";

export function flattenExperienceTree(nodes: ExperienceNode[]): ExperienceItem[] {
    return nodes.flatMap((node) =>
        node.type === "folder"
            ? flattenExperienceTree(node.children)
            : [node]
    );
}