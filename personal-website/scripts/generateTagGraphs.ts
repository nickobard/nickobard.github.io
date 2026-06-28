import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {writeFileSync} from "node:fs";
import {generalTagGraph} from "../src/data/tags/general.ts";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const outputPath = resolve(projectRoot, "src/data/tags.mmd");


function toMermaidId(tag: string): string {
    return tag.replace(/[^a-zA-Z0-9]/g, "_");
}

function toMermaidLabel(tag: string): string {
    return tag.replace(/"/g, '\\"');
}

let mermaid = "graph BT\n\n";

for (const [child, parents] of generalTagGraph) {
    for (const parent of parents) {
        const childId = toMermaidId(child);
        const parentId = toMermaidId(parent);

        mermaid += `    ${childId}["${toMermaidLabel(child)}"] --> ${parentId}["${toMermaidLabel(parent)}"]\n`;
    }
}

writeFileSync(outputPath, mermaid);
console.log(`Generated ${outputPath}`);
