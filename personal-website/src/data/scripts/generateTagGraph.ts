import {tagTrees} from "../tagTrees.ts";
import {buildTagGraph} from "../../utils/tagGraph.ts";
import {writeFileSync} from "node:fs";

const graph = buildTagGraph(tagTrees);

function toMermaidId(tag: string): string {
    return tag.replace(/[^a-zA-Z0-9]/g, "_");
}

function toMermaidLabel(tag: string): string {
    return tag.replace(/"/g, '\\"');
}

let mermaid = "graph BT\n\n";

for (const [child, parents] of graph) {
    for (const parent of parents) {
        const childId = toMermaidId(child);
        const parentId = toMermaidId(parent);

        mermaid += `    ${childId}["${toMermaidLabel(child)}"] --> ${parentId}["${toMermaidLabel(parent)}"]\n`;
    }
}

writeFileSync("src/data/tags.mmd", mermaid);