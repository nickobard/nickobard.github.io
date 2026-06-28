import type {TagTreeNode} from "../types/TagGraph.ts";

type StackItem = {
    indent: number;
    children: TagTreeNode[];
};

export function parseTagTrees(trees: string[]): TagTreeNode[] {
    return trees.flatMap(parseTagTree);
}

export function parseTagTree(text: string): TagTreeNode[] {
    const roots: TagTreeNode[] = [];
    const stack: StackItem[] = [
        { indent: -1, children: roots },
    ];

    for (const rawLine of text.split("\n")) {
        if (!rawLine.trim()) {
            continue;
        }

        const indent = rawLine.match(/^\s*/)?.[0].length ?? 0;
        const name = parseTagNames(rawLine);

        if (name.length === 0) {
            continue;
        }

        const node: TagTreeNode = {
            name,
            children: [],
        };

        while (stack.length > 1 && indent <= stack.at(-1)!.indent) {
            stack.pop();
        }

        stack.at(-1)!.children.push(node);
        stack.push({ indent, children: node.children! });
    }

    return roots;
}

function parseTagNames(rawLine: string): string[] {
    return rawLine
        .trim()
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
}
