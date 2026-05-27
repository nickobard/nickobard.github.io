import type {PortfolioItem} from "../types/portfolio.ts";

export const portfolioItems: PortfolioItem[] = [
    {
        title: "Machine Learning Project",
        tags: ["ML", "Python", "Data Science"],
        summary: "Built a model for classification.",
        details: [
            "Used scikit-learn",
            "Cleaned dataset",
            "Evaluated with F1-score",
        ],
    },
    {
        title: "Frontend Portfolio",
        tags: ["React", "TypeScript", "CSS"],
        summary: "Created personal portfolio website.",
        details: [
            "Built with Vite",
            "Deployed to GitHub Pages",
        ],
    },
];