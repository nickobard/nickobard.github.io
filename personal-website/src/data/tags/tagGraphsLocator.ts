import type {TagGraph} from "../../types/TagGraph.ts";
import {generalTagGraph} from "./general.ts";
import {JetBrainsTagGraph} from "./jetbrains/tags.ts";

export const tagGraphsLocator = new Map<string, TagGraph>();

tagGraphsLocator.set('general', generalTagGraph);
tagGraphsLocator.set('jetbrains', JetBrainsTagGraph);


export function combineTagGraphs(
    graphNames: string[],
    locator: Map<string, TagGraph> = tagGraphsLocator,
): TagGraph {
    const combinedGraph: TagGraph = new Map();

    for (const graphName of graphNames) {
        const graph = locator.get(graphName);

        if (!graph) {
            throw new Error(`Unknown tag graph: ${graphName}`);
        }

        for (const [child, parents] of graph) {
            if (!combinedGraph.has(child)) {
                combinedGraph.set(child, new Set());
            }

            const combinedParents = combinedGraph.get(child)!;

            for (const parent of parents) {
                combinedParents.add(parent);
            }
        }
    }

    return combinedGraph;
}

export const wholeGraph = combineTagGraphs([...tagGraphsLocator.keys()])