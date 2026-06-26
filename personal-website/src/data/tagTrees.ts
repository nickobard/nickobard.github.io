import {tag, type TagTreeNode} from "../types/TagGraph";
import {buildTagGraph} from "../utils/tagGraph.ts";

const AITree = tag(
    "Artificial Intelligence",
    tag(
        "Machine Learning",
        tag("Linear Regression"),
        tag("Logistic Regression"),
        tag("Neural Networks"),
    ),
);

const ProgrammingTree = tag(
    "Programming",
    tag(
        "Frontend",
        tag("React"),
        tag("CSS"),
    ),
);

export const tagTrees = [
    AITree, ProgrammingTree
] satisfies TagTreeNode[];

export const tagGraph = buildTagGraph(tagTrees);