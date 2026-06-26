export type TagTreeNode = {
    name: string;
    children?: TagTreeNode[];
}

export type TagEdge = {
    child: string;
    parent: string;
}

export function tag(
    name: string,
    ...children: TagTreeNode[]
): TagTreeNode {
    return {name, children};
}