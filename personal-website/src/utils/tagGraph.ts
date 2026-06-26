import type {TagEdge, TagTreeNode} from "../types/TagGraph";

export function buildTagEdges(trees: TagTreeNode[]): TagEdge[] {
    const edges: TagEdge[] = [];

    function visit(node: TagTreeNode, parent?: string) {
        if (parent) {
            edges.push({
                child: node.name,
                parent,
            });
        }

        for (const child of node.children ?? []) {
            visit(child, node.name);
        }
    }

    for (const tree of trees) {
        visit(tree);
    }

    return edges;
}