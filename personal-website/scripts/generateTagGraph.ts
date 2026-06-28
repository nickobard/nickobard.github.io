import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {writeFileSync} from "node:fs";
import {tagTrees} from "../src/data/tagTrees.ts";
import {buildTagGraph} from "../src/utils/tagGraph.ts";
import {parseTagTrees} from "../src/utils/parseTagTrees.ts";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const outputPath = resolve(projectRoot, "src/data/tags.mmd");

const graph = buildTagGraph(parseTagTrees(tagTrees));

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

writeFileSync(outputPath, mermaid);
console.log(`Generated ${outputPath}`);
