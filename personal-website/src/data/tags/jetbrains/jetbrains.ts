import {type TagTreesString, bottomUpTagTreesString, topDownTagTreesString} from "../../../types/TagGraph.ts";
import {parseTagTrees} from "../../../utils/parseTagTrees.ts";
import {buildTagGraph} from "../../../utils/tagGraph.ts";
import {generateTagGraphMmd} from "../../../utils/generateTagGraphMmd.ts";

const topDownTrees = topDownTagTreesString(
    `
    
    `
)

const bottomUpTrees = bottomUpTagTreesString(
    `
    Spreadsheets
        Google Spreadsheet
        Spreadsheets Programming
        Excel
        Excel Programming
        
    Data Analysis
        Data Science
        
    Hypothesis Testing
        Statistics
    `
)

const tagTreesStrings = [
    bottomUpTrees, topDownTrees
] satisfies TagTreesString[];

const parsedTrees = parseTagTrees(tagTreesStrings);

export const JetBrainsTagGraph = buildTagGraph(parsedTrees);

generateTagGraphMmd(JetBrainsTagGraph, import.meta.url, 'jetbrains.mmd');
