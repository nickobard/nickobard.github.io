import {bottomUpTagTreesString, type TagTreesString} from "../../../types/TagGraph.ts";
import {parseTagTrees} from "../../../utils/parseTagTrees.ts";
import {buildTagGraph} from "../../../utils/tagGraph.ts";

export const JBDataAnalystTags = []

const JetBrainsDataAnalystTree = bottomUpTagTreesString(
    `
    Spreadsheet
        Google Spreadsheet
        Spreadsheets Programming
        Excel
        Excel Programming
    `
)


const tagTreesStrings = [
    JetBrainsDataAnalystTree
] satisfies TagTreesString[];

const parsedTrees = parseTagTrees(tagTreesStrings);

export const JetBrainsTagGraph = buildTagGraph(parsedTrees);
