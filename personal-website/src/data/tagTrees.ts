import {tag, type TagTreeNode} from "../types/TagGraph";
import {buildTagGraph} from "../utils/tagGraph.ts";

export const tagTrees = [
    tag(
        "Artificial Intelligence",
        tag(
            "Machine Learning",
            tag(["Linear Regression", "Logistic Regression", "Neural Networks", "NLP"]),
            tag(
                "Deep Learning",
                tag(["Transformers", "PyTorch"]),
            ),
        ),
    ),
    tag(
        "Programming",
        tag("Frontend", tag(["React", "CSS"])),
        tag(
            "Python",
            tag(["Pandas", "NumPy"]),
            tag(["PyTorch", "Hugging Face"]),
        ),
    ),
    tag(
        "Data Analysis",
        tag(["Pandas", "NumPy"]),
        tag("Bootstrap"),
    ),
    tag(
        "Statistics",
        tag("Bootstrap"),
    ),
] satisfies TagTreeNode[];

export const tagGraph = buildTagGraph(tagTrees);
