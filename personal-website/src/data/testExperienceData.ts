import type {ExperienceNode} from "../types/experienceNodes.ts";
import {createFolder, createItem} from "../types/experienceNodes.ts";

export const testExperienceData: ExperienceNode[] = [
    createFolder({
        title: "Data Science",
        date_label: "Feb 2022 - Mar 2025",
        start_date: "2022-02-01",
        end_date: "2025-03-31",
        summary: "ML, analytics, and visualization work.",
        description:
            "Projects involving machine learning, analytics, and visualization across structured data, graphs, and predictive modeling.",
        children: [
            createItem({
                title: "Image Classification Pipeline",
                date_label: "Feb 2022 - Apr 2022",
                start_date: "2022-02-01",
                end_date: "2022-04-30",
                core_tags: ["Keras", "TensorFlow", "Computer Vision"],
                description:
                    "Developed a CNN-based image classification pipeline with preprocessing, augmentation, training, and model comparison.",
                details: `
                    - Implemented data augmentation
                    - Trained custom CNN architectures
                    - Compared model accuracy across datasets
                `,
            }),
            createFolder({
                title: "Machine Learning",
                date_label: "May 2022 - Feb 2023",
                start_date: "2022-05-01",
                end_date: "2023-02-28",
                summary: "Predictive modeling projects.",
                children: [
                    createItem({
                        title: "Customer Churn Prediction",
                        date_label: "May 2022 - Aug 2022",
                        start_date: "2022-05-01",
                        end_date: "2022-08-31",
                        core_tags: ["ML", "Python", "scikit-learn"],
                        description: "Predicted customer retention using ensemble models.",
                        details: `
                            - Engineered behavioral features
                            - Compared Random Forest and XGBoost
                            - Evaluated with ROC-AUC
                        `,
                    }),
                    createItem({
                        title: "House Price Estimation",
                        date_label: "Nov 2022 - Feb 2023",
                        start_date: "2022-11-01",
                        end_date: "2023-02-28",
                        core_tags: ["ML", "Python", "scikit-learn", "Pandas"],
                        description:
                            "Built regression models for property valuation using tabular housing data, missing-value handling, feature selection, and error analysis.",
                        details: `
                            - Performed feature selection
                            - Handled missing values
                            - Measured performance with RMSE
                        `,
                    }),
                ],
            }),
            createItem({
                title: "Time Series Forecasting",
                date_label: "Mar 2023 - Jun 2023",
                start_date: "2023-03-01",
                end_date: "2023-06-30",
                core_tags: ["Keras", "TensorFlow", "Forecasting"],
                description: "Forecasted demand using recurrent neural networks.",
                details: `
                    - Prepared temporal datasets
                    - Built LSTM models
                    - Analyzed prediction drift
                `,
            }),
            createItem({
                title: "Fraud Detection Prototype",
                date_label: "Sep 2023 - Dec 2023",
                start_date: "2023-09-01",
                end_date: "2023-12-31",
                core_tags: ["Keras", "TensorFlow", "Anomaly Detection"],
                description:
                    "Explored neural anomaly detection methods for identifying suspicious financial transaction patterns under class imbalance.",
                details: `
                    - Generated synthetic fraud samples
                    - Tested autoencoder architectures
                    - Evaluated precision and recall
                `,
            }),
            createFolder({
                title: "Data Analysis",
                date_label: "Jan 2024 - Sep 2024",
                start_date: "2024-01-01",
                end_date: "2024-09-30",
                summary: "Exploratory analysis and visualization projects.",
                children: [
                    createItem({
                        title: "Social Network Exploration",
                        date_label: "Jan 2024 - Apr 2024",
                        start_date: "2024-01-01",
                        end_date: "2024-04-30",
                        core_tags: ["NetworkX", "Python", "Graph Analysis"],
                        description:
                            "Investigated social graph structure using centrality metrics, community detection, and visual network exploration.",
                        details: `
                            - Computed centrality measures
                            - Detected graph communities
                            - Visualized network structures
                        `,
                    }),
                    createItem({
                        title: "Interactive Sales Dashboard",
                        date_label: "Jun 2024 - Sep 2024",
                        start_date: "2024-06-01",
                        end_date: "2024-09-30",
                        core_tags: ["Pandas", "Python", "Visualization"],
                        description: "Created visual analytics for business metrics.",
                        details: `
                            - Built KPI dashboards
                            - Aggregated transactional data
                            - Produced interactive visual reports
                        `,
                    }),
                ],
            }),
            createItem({
                title: "Recommendation Engine",
                date_label: "Nov 2024 - Mar 2025",
                start_date: "2024-11-01",
                end_date: "2025-03-31",
                core_tags: ["Keras", "TensorFlow", "Recommender Systems"],
                description:
                    "Implemented a recommendation prototype based on user-item interactions, embedding representations, and ranking-quality evaluation.",
                details: `
                    - Processed user-item interactions
                    - Built embedding-based models
                    - Evaluated recommendation quality
                `,
            }),
        ],
    }),
    createItem({
        title: "Logistics Demand Forecasting",
        date_label: "Apr 2025 - Jun 2025",
        start_date: "2025-04-01",
        end_date: "2025-06-30",
        core_tags: ["ML", "Python", "scikit-learn", "Pandas"],
        description: "Predicted shipment volumes across regions.",
        details: `
            - Analyzed historical demand
            - Built forecasting pipelines
            - Visualized seasonal patterns
        `,
    }),
    createItem({
        title: "Credit Risk Assessment",
        date_label: "Jul 2025 - Sep 2025",
        start_date: "2025-07-01",
        end_date: "2025-09-30",
        core_tags: ["ML", "Python", "scikit-learn", "Pandas"],
        description:
            "Classified loan applications by risk level using supervised learning, imbalance handling, model comparison, and explainability reporting.",
        details: `
            - Balanced imbalanced datasets
            - Compared classification models
            - Reported model explainability metrics
        `,
    }),
    createFolder({
        title: "Software Engineering",
        date_label: "Aug 2023 - Present",
        start_date: "2023-08-01",
        summary: "Frontend, backend, and tooling projects.",
        description:
            "Software projects covering web development, automation, containerization, command-line tooling, and system monitoring.",
        children: [
            createItem({
                title: "Personal Portfolio Website",
                date_label: "Sep 2025 - Present",
                start_date: "2025-09-01",
                core_tags: ["React", "TypeScript", "GitHub Pages"],
                description: "Designed and deployed a personal portfolio.",
            }),
            createItem({
                title: "Dockerized API Service",
                date_label: "Aug 2023 - Oct 2023",
                start_date: "2023-08-01",
                end_date: "2023-10-31",
                core_tags: ["Python", "Docker", "FastAPI"],
                description:
                    "Created a FastAPI service packaged with Docker, including local development configuration and reproducible deployment setup.",
            }),
            createItem({
                title: "University Timetable Planner",
                date_label: "Jan 2024 - May 2024",
                start_date: "2024-01-01",
                end_date: "2024-05-31",
                core_tags: ["TypeScript", "React", "UI Design"],
                description: "Built an interactive schedule planner.",
            }),
            createItem({
                title: "Git Automation Toolkit",
                date_label: "Oct 2024 - Dec 2024",
                start_date: "2024-10-01",
                end_date: "2024-12-31",
                core_tags: ["Python", "Git", "CLI"],
                description:
                    "Automated repetitive Git operations through a small command-line toolkit focused on workflow speed and consistency.",
            }),
            createItem({
                title: "Linux Monitoring Dashboard",
                date_label: "Feb 2025 - Apr 2025",
                start_date: "2025-02-01",
                end_date: "2025-04-30",
                core_tags: ["Linux", "Python", "Monitoring"],
                description: "Collected and visualized system metrics.",
            }),
        ],
    }),
    createItem({
        title: "Research Paper Recommender",
        date_label: "Oct 2025 - Jan 2026",
        start_date: "2025-10-01",
        end_date: "2026-01-31",
        core_tags: ["NLP", "Python", "Machine Learning"],
        description:
            "Suggested academic papers based on user interests using document embeddings, similarity search, and relevance evaluation.",
        details: `
            - Generated document embeddings
            - Implemented similarity search
            - Evaluated recommendation relevance
        `,
    }),
];
