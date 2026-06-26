import type {TagGraph} from "../types/TagGraph.ts";

export function imputeParentTags(graph: TagGraph, tagName: string): string[] {
    const result = new Set<string>();
    const stack = [...(graph.get(tagName) ?? [])];

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (result.has(current)) {
            continue;
        }

        result.add(current);

        for (const parent of graph.get(current) ?? []) {
            stack.push(parent);
        }
    }

    return [...result];
}