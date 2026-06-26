export type TagTreeNode = {
    name: string[];
    children?: TagTreeNode[];
}

export type TagGraph = Map<string, Set<string>>;

export function tag(
    name: string | string[],
    ...children: TagTreeNode[]
): TagTreeNode {
    return {
        name: Array.isArray(name) ? name : [name],
        children,
    };
}
