import type {TagGraph} from "../types/TagGraph.ts";

export function imputeParentTags(graph: TagGraph, tagName: string): string[] {
    const result = new Set<string>();
    const queue = [...(graph.get(tagName) ?? [])];

    while (queue.length > 0) {
        const current = queue.shift()!;

        if (result.has(current)) {
            continue;
        }

        result.add(current);

        for (const parent of graph.get(current) ?? []) {
            queue.push(parent);
        }
    }

    return [...result];
}
