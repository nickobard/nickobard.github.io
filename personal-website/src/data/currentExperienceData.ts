import type {ExperienceNode} from "../types/experienceNodes.ts";
import {createFolder, createItem} from "../types/experienceNodes.ts";

export const currentExperienceData: ExperienceNode[] = [
    createFolder({
        title: "Work Experience",
        summary: "Experience doing actual service to someone, instead of just learning or doing pet-projects.",
        priority: 1,
        children: [
            createFolder({
                title: "JetBrains s.r.o.",
                summary: "Work experience in a big-tech company which develop tools for SW engineers and Data Scientists.",
                children: [
                    createItem({
                        title: "Junior Data Analyst",
                        start_date: "2025-07-15",
                        end_date: "2026-03",
                        tags: ["Data Analysis"],
                    }),
                    createItem({
                        title: "Intern Data Analyst",
                        summary: "First big-tech work experience.",
                        start_date: "2025-01-15",
                        end_date: "2025-07-15",
                        details: `
                            - Calculated conversions of users from trial to license statistics
                            - Did scientific project of estimating state-of-the-art methods for computing simultaneous confidence intervals
                                - Used parallelism for computationally intensive simulations
                                - Studied state-of-the-art methods
                                - Compared and presented to the team of Data Analysts
                        `,
                        tags: ["Data Analysis"],
                    }),
                ]
            }),

            createItem({
                title: "Technical Assistant",
                summary: "Summer school for teenagers about AI from AI dětem.",
                start_date: "2024-07-01",
                end_date: "2024-07-08",
                description: "Test description",
                tags: ["Education"],
                details: `
                    - Test details point
                    - Test details point
                    - Test details point
                `
            }),
            createFolder({
                    title: 'Management at student club',
                    children: [
                        createItem({
                            title: "Head of Sports",
                            summary: "Volunteering to rebuild a gym at student club Buben.",
                            start_date: "2023-09-01",
                            end_date: "2026-02-01",
                            tags: ["Management"],
                        }),
                        createItem({
                            title: "Board Member",
                            summary: "Volunteering to rebuild a student club Buben.",
                            start_date: "2023-09-01",
                            end_date: "2025-02-01",
                            tags: ["Management"],
                        }),
                    ]
                }
            ),
            createFolder({
                title: "University Activities",
                children: [
                    createItem({
                        title: "Freelance university activities",
                        summary: "Faculty of Information Technology at Czech Technical University.",
                        start_date: "2022-09",
                        end_date: "2024-09",
                    }),
                    createItem({
                        title: "Research Summer",
                        summary: "Faculty of Information Technology at Czech Technical University.",
                        start_date: "2023-06-01",
                        end_date: "2026-02-01",
                    })
                ]
            })

        ],
    }),
    createFolder({
        title: "Education",
        priority: 2,
        children: [
            createFolder({
                title: "Bachelor Program",
                start_date: "2022-09-01",
                end_date: "2026-06-24",
                children: [
                    createFolder({
                        title: "Data Science Program",
                        start_date: "2024-09-01",
                        end_date: "2025-09-01",
                        children: []

                    }),
                    createFolder({
                        title: "Software Engineering Program",
                        start_date: "2024-09-01",
                        end_date: "2025-09-01",
                        children: []

                    }),
                    createItem({
                        title: "Research Summer",
                        summary: "Faculty of Information Technology at Czech Technical University.",
                        start_date: "2023-06-01",
                        end_date: "2026-02-01",
                    })
                ]
            }),
        ],
    }),
    createFolder({
        title: "Personal Projects",
        priority: 3,
        start_date: "2024-01",
        children: [
            createItem({
                title: "Personal Website",
                start_date: "2026-05"
            })
        ]
    }),
    createFolder({
        title: "Volunteering",
        priority: 4,
        start_date: "2023-07-01",
        end_date: "2026-02-01",
        children: [
            createItem({
                title: 'Head of sports',
                start_date: "2023-07-01",
                end_date: "2026-02-01",
                show_in_list_view: false,
            })
        ]
    })
];
