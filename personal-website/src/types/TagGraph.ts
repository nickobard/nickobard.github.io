export type TagTreeNode = {
    name: string[];
    children?: TagTreeNode[];
}

export type TagGraph = Map<string, Set<string>>;

export type TagTreesString = {
    type: 'bottomUp' | 'topDown',
    tree: string;
}

export function bottomUpTagTreesString(
    tree: string
): TagTreesString {
    return {
        type: "bottomUp",
        tree: tree,
    }
}

export function topDownTagTreesString(
    tree: string
): TagTreesString {
    return {
        type: "topDown",
        tree: tree
    }
}

