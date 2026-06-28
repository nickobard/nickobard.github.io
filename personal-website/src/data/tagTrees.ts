import {buildTagGraph} from "../utils/tagGraph.ts";
import {parseTagTrees} from "../utils/parseTagTrees.ts";


const AI = `
    Artificial Intelligence, Data Science
        Machine Learning
            Logistic Regression, Linear Regression, Neural Networks, NLP
            Deep Learning
                Transformers, PyTorch
                `;

const Programming = `
    Programming
        Frontend
            React, CSS
        Python
            Pandas, NumPy
            PyTorch, Hugging Face
`;

const DataAnalysis = `
    Data Analysis
        Pandas, NumPy
        Statistics
            Bootstrap
`;


export const tagTrees = [
    AI, Programming, DataAnalysis
] satisfies string[];

const parsedTrees = parseTagTrees(tagTrees);

export const tagGraph = buildTagGraph(parsedTrees);
