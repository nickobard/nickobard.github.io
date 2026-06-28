import type {TagGraph} from "../types/TagGraph.ts";

declare const __ALLOW_TAG_GRAPH_MMD_GENERATION__: boolean;

const pendingGenerations: Promise<void>[] = [];

export function generateTagGraphMmd(
    graph: TagGraph,
    moduleUrl: string,
    fileName = "tags.mmd",
): Promise<void> | undefined {
    if (!shouldGenerateTagGraphMmd()) {
        return undefined;
    }

    const generation = writeTagGraphMmd(graph, moduleUrl, fileName);
    pendingGenerations.push(generation);

    return generation;
}

export async function waitForTagGraphMmdGeneration(): Promise<void> {
    await Promise.all(pendingGenerations);
}

async function writeTagGraphMmd(
    graph: TagGraph,
    moduleUrl: string,
    fileName: string,
): Promise<void> {
    const dynamicImport = new Function("specifier", "return import(specifier)") as <T>(specifier: string) => Promise<T>;
    const nodeProtocol = "node:";
    const [{dirname, resolve}, {fileURLToPath}, {writeFile}] = await Promise.all([
        dynamicImport<typeof import("node:path")>(`${nodeProtocol}path`),
        dynamicImport<typeof import("node:url")>(`${nodeProtocol}url`),
        dynamicImport<typeof import("node:fs/promises")>(`${nodeProtocol}fs/promises`),
    ]);

    const outputPath = resolve(dirname(fileURLToPath(moduleUrl)), fileName);

    await writeFile(outputPath, tagGraphToMermaid(graph));
    console.log(`Generated ${outputPath}`);
}

export function tagGraphToMermaid(graph: TagGraph): string {
    let mermaid = "graph BT\n\n";

    for (const [child, parents] of graph) {
        for (const parent of parents) {
            const childId = toMermaidId(child);
            const parentId = toMermaidId(parent);

            mermaid += `    ${childId}["${toMermaidLabel(child)}"] --> ${parentId}["${toMermaidLabel(parent)}"]\n`;
        }
    }

    return mermaid;
}

function toMermaidId(tag: string): string {
    return tag.replace(/[^a-zA-Z0-9]/g, "_");
}

function toMermaidLabel(tag: string): string {
    return tag.replace(/"/g, '\\"');
}

function isNodeRuntime(): boolean {
    return typeof process !== "undefined" && Boolean(process.versions?.node);
}

function shouldGenerateTagGraphMmd(): boolean {
    if (!isNodeRuntime()) {
        return false;
    }

    if (typeof __ALLOW_TAG_GRAPH_MMD_GENERATION__ !== "undefined") {
        return __ALLOW_TAG_GRAPH_MMD_GENERATION__;
    }

    return process.env.NODE_ENV !== "production";
}
