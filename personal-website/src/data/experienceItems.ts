import type {ExperienceNode} from "../types/experienceNodes.ts";

export const testExperienceData: ExperienceNode[] = [
    {
        type: "folder",
        title: "Data Science",
        children: [
            {
                type: "item",
                title: "Project A",
                tags: ["Keras", "Tensorflow"]
            },
            {
                type: "folder",
                title: "Machine Learning",
                children: [
                    {
                        type: "item",
                        title: "Classification Project",
                        tags: ["ML", "Python", "scikit-learn"],
                        summary: "Built a classification model.",
                        details: ["Cleaned dataset", "Evaluated with F1-score"],
                    },
                    {
                        type: "item",
                        title: "Prediction Project",
                        tags: ["ML", "Python", "scikit-learn", "Pandas"],
                        summary: "Built a Prediction model.",
                        details: ["Cleaned dataset", "Evaluated with F1-score"],
                    }
                ],
            },
            {
                type: "item",
                title: "Project B",
                tags: ["Keras", "Tensorflow"]
            },
            {
                type: "item",
                title: "Project C",
                tags: ["Keras", "Tensorflow"]
            },
            {
                type: "folder",
                title: "Data Analysis",
                children: [
                    {
                        type: "item",
                        title: "Analysis Project",
                        tags: ["NetworkX", "Python", "scikit-learn"],
                        summary: "Created visuals with network X.",
                        details: ["Cleaned dataset", "Evaluated with F1-score"],
                    },
                    {
                        type: "item",
                        title: "Visualization Project",
                        tags: ["ML", "Python", "scikit-learn", "Pandas"],
                        summary: "Built a Prediction model.",
                        details: ["Cleaned dataset", "Evaluated with F1-score"],
                    }
                ],
            },
            {
                type: "item",
                title: "Project D",
                tags: ["Keras", "Tensorflow"]
            }
        ],
    },
    {
        type: "folder",
        title: "Software Engineering",
        children: [
            {
                type: "item",
                title: "Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                summary: "Built this portfolio website.",
            },
            {
                type: "item",
                title: "Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                summary: "Built this portfolio website.",
            },
            {
                type: "item",
                title: "Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                summary: "Built this portfolio website.",
            },
            {
                type: "item",
                title: "Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                summary: "Built this portfolio website.",
            },
            {
                type: "item",
                title: "Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                summary: "Built this portfolio website.",
            }
        ],
    },
];