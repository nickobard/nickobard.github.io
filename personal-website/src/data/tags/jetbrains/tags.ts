import {type TagTreesString, bottomUpTagTreesString} from "../../../types/TagGraph.ts";
import {parseTagTrees} from "../../../utils/parseTagTrees.ts";
import {buildTagGraph} from "../../../utils/tagGraph.ts";
import {generateTagGraphMmd} from "../../../utils/generateTagGraphMmd.ts";

export const JBDataAnalystTags = ['Spreadsheet']

const JetBrainsDataAnalystTree = bottomUpTagTreesString(
    `
    Spreadsheet
        Google Spreadsheet, Spreadsheets Programming, Excel, Excel Programming
    `
)


const tagTreesStrings = [
    JetBrainsDataAnalystTree
] satisfies TagTreesString[];

const parsedTrees = parseTagTrees(tagTreesStrings);

export const JetBrainsTagGraph = buildTagGraph(parsedTrees);

generateTagGraphMmd(JetBrainsTagGraph, import.meta.url, 'jetbrains.mmd');
