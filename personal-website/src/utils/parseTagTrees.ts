import type {TagTreeNode, TagTreesString} from "../types/TagGraph.ts";

type StackItem = {
    indent: number;
    children: TagTreeNode[];
};

type TagTreeLine = {
    indent: number;
    name: string[];
};

export function parseTagTrees(trees: TagTreesString[]): TagTreeNode[] {
    return trees.flatMap(tree => parseTagTree(tree));
}

export function parseTagTree(tree: TagTreesString): TagTreeNode[] {
    const lines = parseTagTreeLines(tree.tree);

    if (tree.type === 'bottomUp') {
        return parseBottomUpTagTree(lines);
    }

    return parseTopDownTagTree(lines);
}

function parseTopDownTagTree(lines: TagTreeLine[]): TagTreeNode[] {
    const roots: TagTreeNode[] = [];
    const stack: StackItem[] = [
        {indent: -1, children: roots},
    ];

    for (const {indent, name} of lines) {
        const node: TagTreeNode = {
            name,
            children: [],
        };

        while (stack.length > 1 && indent <= stack.at(-1)!.indent) {
            stack.pop();
        }

        stack.at(-1)!.children.push(node);
        stack.push({indent, children: node.children!});
    }

    return roots;
}

function parseBottomUpTagTree(lines: TagTreeLine[]): TagTreeNode[] {
    const roots: TagTreeNode[] = [];
    const stack: { indent: number; nodes: TagTreeNode[] }[] = [];

    function flushRootPath() {
        const rootNodes = stack.at(-1)?.nodes;

        if (rootNodes) {
            roots.push(...rootNodes);
        }

        stack.length = 0;
    }

    for (const {indent, name} of lines) {
        if (stack.length > 0 && indent < stack.at(-1)!.indent) {
            flushRootPath();
        }

        if (stack.length > 0 && indent === stack.at(-1)!.indent) {
            stack.at(-1)!.nodes.push({name, children: []});
            continue;
        }

        const children = stack.at(-1)?.nodes ?? [];
        stack.push({
            indent,
            nodes: [{name, children}],
        });
    }

    flushRootPath();

    return roots;
}


function parseTagTreeLines(text: string): TagTreeLine[] {
    const rawLines = text
        .split("\n")
        .filter((line) => line.trim());
    const commonIndent = getCommonIndent(rawLines);

    return rawLines
        .map((rawLine) => {
            const indent = Math.max(0, getIndent(rawLine) - commonIndent);
            const name = parseTagNames(rawLine);

            return {indent, name};
        })
        .filter((line) => line.name.length > 0);
}

function getCommonIndent(lines: string[]): number {
    if (lines.length === 0) {
        return 0;
    }

    return Math.min(...lines.map(getIndent));
}

function getIndent(line: string): number {
    return line.match(/^\s*/)?.[0].length ?? 0;
}

function parseTagNames(rawLine: string): string[] {
    return rawLine
        .trim()
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
}
