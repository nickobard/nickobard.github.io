import {tagTrees} from "../tagTrees.ts";
import {buildTagEdges} from "../../utils/tagGraph.ts";
import {writeFileSync} from "node:fs";

const edges = buildTagEdges(tagTrees);

function toMermaidId(tag: string): string {
    return tag.replace(/[^a-zA-Z0-9]/g, "_");
}

function toMermaidLabel(tag: string): string {
    return tag.replace(/"/g, '\\"');
}

let mermaid = "graph BT\n\n";

for (const edge of edges) {
    const childId = toMermaidId(edge.child);
    const parentId = toMermaidId(edge.parent);

    mermaid += `    ${childId}["${toMermaidLabel(edge.child)}"] --> ${parentId}["${toMermaidLabel(edge.parent)}"]\n`;
}

writeFileSync("src/data/tags.mmd", mermaid);