export type TagTreeNode = {
    name: string;
    children?: TagTreeNode[];
}

export type TagGraph = Map<string, Set<string>>;

export function tag(
    name: string,
    ...children: TagTreeNode[]
): TagTreeNode {
    return {name, children};
}