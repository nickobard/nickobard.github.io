import {tag, type TagTreeNode} from "../types/TagGraph";
import {buildTagGraph} from "../utils/tagGraph.ts";


const AI = tag(
    "Artificial Intelligence",
    tag(
        "Machine Learning",
        tag(["Linear Regression", "Logistic Regression", "Neural Networks", "NLP"]),
        tag(
            "Deep Learning",
            tag(["Transformers", "PyTorch"]),
        ),
    ),
);

const Programming = tag(
    "Programming",
    tag("Frontend", tag(["React", "CSS"])),
    tag(
        "Python",
        tag(["Pandas", "NumPy"]),
        tag(["PyTorch", "Hugging Face"]),
    ),
);

const DataAnalysis = tag(
    "Data Analysis",
    tag(["Pandas", "NumPy"]),
    tag("Statistics",
        tag("Bootstrap")),
);


export const tagTrees = [
    AI, Programming, DataAnalysis
] satisfies TagTreeNode[];

export const tagGraph = buildTagGraph(tagTrees);
