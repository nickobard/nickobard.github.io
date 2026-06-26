import type {TagGraph, TagTreeNode} from "../types/TagGraph";

export function buildTagGraph(trees: TagTreeNode[]): TagGraph {
    const graph: TagGraph = new Map();

    function addParents(tagName: string, parentNames: string[]) {
        let parents = graph.get(tagName);

        if (!parents) {
            parents = new Set();
            graph.set(tagName, parents);
        }

        for (const parentName of parentNames) {
            parents.add(parentName);
        }
    }

    function visit(node: TagTreeNode) {
        for (const child of node.children ?? []) {
            for (const tagName of child.name) {
                addParents(tagName, node.name);
            }

            visit(child);
        }
    }

    for (const tree of trees) {
        visit(tree);
    }

    return graph;
}
