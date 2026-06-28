export type TagTreeNode = {
    name: string[];
    children?: TagTreeNode[];
}

export type TagGraph = Map<string, Set<string>>;
