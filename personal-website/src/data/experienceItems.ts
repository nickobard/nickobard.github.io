import type {ExperienceNode} from "../types/experienceNodes.ts";

export const testExperienceData: ExperienceNode[] = [
    {
        type: "folder",
        title: "Data Science",
        description: "Projects involving machine learning, analytics, and visualization.",
        children: [
            {
                type: "item",
                title: "Image Classification Pipeline",
                tags: ["Keras", "TensorFlow", "Computer Vision"],
                description: "Developed a CNN-based image classifier.",
                details: [
                    "Implemented data augmentation",
                    "Trained custom CNN architectures",
                    "Compared model accuracy across datasets",
                ],
            },
            {
                type: "folder",
                title: "Machine Learning",
                description: "Predictive modeling and supervised learning projects.",
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
                        description: "Built regression models for property valuation.",
                        details: [
                            "Performed feature selection",
                            "Handled missing values",
                            "Measured performance with RMSE",
                        ],
                    }
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
                description: "Explored anomaly detection for financial transactions.",
                details: [
                    "Generated synthetic fraud samples",
                    "Tested autoencoder architectures",
                    "Evaluated precision and recall",
                ],
            },
            {
                type: "folder",
                title: "Data Analysis",
                description: "Exploratory analysis and visualization projects.",
                children: [
                    {
                        type: "item",
                        title: "Social Network Exploration",
                        tags: ["NetworkX", "Python", "Graph Analysis"],
                        description: "Investigated community structures in social graphs.",
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
                    }
                ],
            },
            {
                type: "item",
                title: "Recommendation Engine",
                tags: ["Keras", "TensorFlow", "Recommender Systems"],
                description: "Implemented a collaborative filtering prototype.",
                details: [
                    "Processed user-item interactions",
                    "Built embedding-based models",
                    "Evaluated recommendation quality",
                ],
            }
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
        description: "Classified loan applications by risk level.",
        details: [
            "Balanced imbalanced datasets",
            "Compared classification models",
            "Reported model explainability metrics",
        ],
    },
    {
        type: "folder",
        title: "Software Engineering",
        description: "Frontend, backend, and software development projects.",
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
                description: "Created a containerized REST API.",
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
                description: "Automated repetitive Git workflows.",
            },
            {
                type: "item",
                title: "Linux Monitoring Dashboard",
                tags: ["Linux", "Python", "Monitoring"],
                description: "Collected and visualized system metrics.",
            }
        ],
    },
    {
        type: "item",
        title: "Research Paper Recommender",
        tags: ["NLP", "Python", "Machine Learning"],
        description: "Suggested academic papers based on user interests.",
        details: [
            "Generated document embeddings",
            "Implemented similarity search",
            "Evaluated recommendation relevance",
        ],
    }
];
