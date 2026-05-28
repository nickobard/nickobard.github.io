import type {ExperienceNode} from "../types/portfolio.ts";

export const experienceData: ExperienceNode[] = [
    {
        type: "folder",
        title: "Machine Learning",
        tags: ["ML", "Python"],
        children: [
            {
                type: "item",
                title: "Classification Project",
                tags: ["ML", "Python", "scikit-learn"],
                summary: "Built a classification model.",
                details: ["Cleaned dataset", "Evaluated with F1-score"],
            },
        ],
    },
    {
        type: "folder",
        title: "Frontend",
        tags: ["React", "TypeScript"],
        children: [
            {
                type: "item",
                title: "Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                summary: "Built this portfolio website.",
            },
        ],
    },
];