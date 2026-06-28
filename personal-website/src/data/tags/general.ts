import {buildTagGraph} from "../../utils/tagGraph.ts";
import {generateTagGraphMmd} from "../../utils/generateTagGraphMmd.ts";
import {parseTagTrees} from "../../utils/parseTagTrees.ts";
import {bottomUpTagTreesString, type TagTreesString, topDownTagTreesString} from "../../types/TagGraph.ts";


const topDownTrees = topDownTagTreesString(`
    Artificial Intelligence, Data Science
        Machine Learning
            Logistic Regression, Linear Regression, Neural Networks, NLP
            Deep Learning
                Transformers, PyTorch
    
        Data Analysis
            Pandas, NumPy
            Statistics
                Bootstrap
                `);

const bottomUpTrees = bottomUpTagTreesString(`
    PyTorch, Hugging Face, Pandas, NumPy
       Python
          Programming
         
    React, CSS
       Frontend
           Programming
     
    Data Analysis
        Data Science
`);


const tagTreesStrings = [
    topDownTrees, bottomUpTrees
] satisfies TagTreesString[];

const parsedTrees = parseTagTrees(tagTreesStrings);

export const generalTagGraph = buildTagGraph(parsedTrees);

generateTagGraphMmd(generalTagGraph, import.meta.url, 'general.mmd');
