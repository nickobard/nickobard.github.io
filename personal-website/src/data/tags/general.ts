import {buildTagGraph} from "../../utils/tagGraph.ts";
import {parseTagTrees} from "../../utils/parseTagTrees.ts";
import {bottomUpTagTreesString, type TagTreesString, topDownTagTreesString} from "../../types/TagGraph.ts";


const AI = topDownTagTreesString(`
    Artificial Intelligence, Data Science
        Machine Learning
            Logistic Regression, Linear Regression, Neural Networks, NLP
            Deep Learning
                Transformers, PyTorch
                `);

const Programming = bottomUpTagTreesString(`
    PyTorch, Hugging Face
    Pandas, NumPy
       Python
          Programming
         
    React, CSS
       Frontend
           Programming
`);

const DataAnalysis = topDownTagTreesString(`
    Data Analysis
        Pandas, NumPy
        Statistics
            Bootstrap
`);

const tagTreesStrings = [
    AI, Programming, DataAnalysis
] satisfies TagTreesString[];

const parsedTrees = parseTagTrees(tagTreesStrings);

export const generalTagGraph = buildTagGraph(parsedTrees);
