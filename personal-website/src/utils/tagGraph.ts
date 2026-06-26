import type {TagGraph, TagTreeNode} from "../types/TagGraph";

export function buildTagGraph(trees: TagTreeNode[]): TagGraph {
    const graph: TagGraph = new Map();

    function visit(node: TagTreeNode, parent?: string) {
        if (parent) {
            let parents = graph.get(node.name);

            if (!parents) {
                parents = new Set();
                graph.set(node.name, parents);
            }

            parents.add(parent);
        }

        for (const child of node.children ?? []) {
            visit(child, node.name);
        }
    }

    for (const tree of trees) {
        visit(tree);
    }

    return graph;
}