import type {ExperienceNode} from "../types/experienceNodes.ts";

export const testExperienceData: ExperienceNode[] = [
    {
        type: "folder",
        title: "Data Science",
        summary: "ML, analytics, and visualization work.",
        description:
            "Projects involving machine learning, analytics, and visualization across structured data, graphs, and predictive modeling.",
        children: [
            {
                type: "item",
                title: "Image Classification Pipeline",
                tags: ["Keras", "TensorFlow", "Computer Vision"],
                description:
                    "Developed a CNN-based image classification pipeline with preprocessing, augmentation, training, and model comparison.",
                details: [
                    "Implemented data augmentation",
                    "Trained custom CNN architectures",
                    "Compared model accuracy across datasets",
                ],
            },
            {
                type: "folder",
                title: "Machine Learning",
                summary: "Predictive modeling projects.",
                children: [
                    {
                        type: "item",
                        title: "Customer Churn Prediction",
                        tags: ["ML", "Python", "scikit-learn"],
                        description: "Predicted customer retention using ensemble models.",
                        details: [
                            "Engineered behavioral features",
                            "Compared Random Forest and XGBoost",
                            "Evaluated with ROC-AUC",
                        ],
                    },
                    {
                        type: "item",
                        title: "House Price Estimation",
                        tags: ["ML", "Python", "scikit-learn", "Pandas"],
                        description:
                            "Built regression models for property valuation using tabular housing data, missing-value handling, feature selection, and error analysis.",
                        details: [
                            "Performed feature selection",
                            "Handled missing values",
                            "Measured performance with RMSE",
                        ],
                    },
                ],
            },
            {
                type: "item",
                title: "Time Series Forecasting",
                tags: ["Keras", "TensorFlow", "Forecasting"],
                description: "Forecasted demand using recurrent neural networks.",
                details: [
                    "Prepared temporal datasets",
                    "Built LSTM models",
                    "Analyzed prediction drift",
                ],
            },
            {
                type: "item",
                title: "Fraud Detection Prototype",
                tags: ["Keras", "TensorFlow", "Anomaly Detection"],
                description:
                    "Explored neural anomaly detection methods for identifying suspicious financial transaction patterns under class imbalance.",
                details: [
                    "Generated synthetic fraud samples",
                    "Tested autoencoder architectures",
                    "Evaluated precision and recall",
                ],
            },
            {
                type: "folder",
                title: "Data Analysis",
                summary: "Exploratory analysis and visualization projects.",
                children: [
                    {
                        type: "item",
                        title: "Social Network Exploration",
                        tags: ["NetworkX", "Python", "Graph Analysis"],
                        description:
                            "Investigated social graph structure using centrality metrics, community detection, and visual network exploration.",
                        details: [
                            "Computed centrality measures",
                            "Detected graph communities",
                            "Visualized network structures",
                        ],
                    },
                    {
                        type: "item",
                        title: "Interactive Sales Dashboard",
                        tags: ["Pandas", "Python", "Visualization"],
                        description: "Created visual analytics for business metrics.",
                        details: [
                            "Built KPI dashboards",
                            "Aggregated transactional data",
                            "Produced interactive visual reports",
                        ],
                    },
                ],
            },
            {
                type: "item",
                title: "Recommendation Engine",
                tags: ["Keras", "TensorFlow", "Recommender Systems"],
                description:
                    "Implemented a recommendation prototype based on user-item interactions, embedding representations, and ranking-quality evaluation.",
                details: [
                    "Processed user-item interactions",
                    "Built embedding-based models",
                    "Evaluated recommendation quality",
                ],
            },
        ],
    },
    {
        type: "item",
        title: "Logistics Demand Forecasting",
        tags: ["ML", "Python", "scikit-learn", "Pandas"],
        description: "Predicted shipment volumes across regions.",
        details: [
            "Analyzed historical demand",
            "Built forecasting pipelines",
            "Visualized seasonal patterns",
        ],
    },
    {
        type: "item",
        title: "Credit Risk Assessment",
        tags: ["ML", "Python", "scikit-learn", "Pandas"],
        description:
            "Classified loan applications by risk level using supervised learning, imbalance handling, model comparison, and explainability reporting.",
        details: [
            "Balanced imbalanced datasets",
            "Compared classification models",
            "Reported model explainability metrics",
        ],
    },
    {
        type: "folder",
        title: "Software Engineering",
        summary: "Frontend, backend, and tooling projects.",
        description:
            "Software projects covering web development, automation, containerization, command-line tooling, and system monitoring.",
        children: [
            {
                type: "item",
                title: "Personal Portfolio Website",
                tags: ["React", "TypeScript", "GitHub Pages"],
                description: "Designed and deployed a personal portfolio.",
            },
            {
                type: "item",
                title: "Dockerized API Service",
                tags: ["Python", "Docker", "FastAPI"],
                description:
                    "Created a FastAPI service packaged with Docker, including local development configuration and reproducible deployment setup.",
            },
            {
                type: "item",
                title: "University Timetable Planner",
                tags: ["TypeScript", "React", "UI Design"],
                description: "Built an interactive schedule planner.",
            },
            {
                type: "item",
                title: "Git Automation Toolkit",
                tags: ["Python", "Git", "CLI"],
                description:
                    "Automated repetitive Git operations through a small command-line toolkit focused on workflow speed and consistency.",
            },
            {
                type: "item",
                title: "Linux Monitoring Dashboard",
                tags: ["Linux", "Python", "Monitoring"],
                description: "Collected and visualized system metrics.",
            },
        ],
    },
    {
        type: "item",
        title: "Research Paper Recommender",
        tags: ["NLP", "Python", "Machine Learning"],
        description:
            "Suggested academic papers based on user interests using document embeddings, similarity search, and relevance evaluation.",
        details: [
            "Generated document embeddings",
            "Implemented similarity search",
            "Evaluated recommendation relevance",
        ],
    },
];
