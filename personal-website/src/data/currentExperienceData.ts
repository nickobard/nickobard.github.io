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
                summary: "Work experience in a big-tech company which develops tools for SW engineers and Data Scientists.",
                children: [
                    createItem({
                        title: "Junior Data Analyst",
                        start_date: "2025-07-15",
                        end_date: "2026-03",
                        description: "Worked for a few more months as a junior data analyst.",
                        details: `
                            - Conducted AB tests,
                            - Calculated retention of users segmented by groups,
                                - Conducted tests of independence between groups for correct interpretation of the results.
                        `,
                        tags: ["Data Analysis", "Statistics", "Bootstrap"],
                    }),
                    createItem({
                        title: "Intern Data Analyst",
                        summary: "First big-tech work experience.",
                        start_date: "2025-01-15",
                        end_date: "2025-07-15",
                        details: `
                            - Calculated conversions of users from trial to license statistics,
                            - Did scientific project of estimating state-of-the-art methods for computing simultaneous confidence intervals:
                                - Used parallelism for computationally intensive simulations,
                                - Studied state-of-the-art methods,
                                - Compared and presented to the team of Data Analysts.
                        `,
                        tags: ["Data Analysis"],
                    }),
                ]
            }),

            createItem({
                title: "Technical Assistant",
                summary: "Summer school for teenagers about AI from AI dětem.",
                start_date: "2024-07-22",
                end_date: "2024-07-25",
                description: "As an AI program student I was as a technical assistant to lectors, guiding students technically and making one technical presentation for them.",
                tags: ["Education"],
                details: `
                    - Guided teams of teenage students in their sprints of creating AI applications,
                    - Advised on some technical details regarding AI models and principles how it works,
                    - Created a presentation about data poisoning of neural network, showing the students dangers of improperly trained networks.
                `
            }),
            createFolder({
                    title: 'Management at student club',
                    description: "Greatly contributed in rebuilding a student club in a dormitory after reconstruction.",
                    children: [
                        createItem({
                            title: "Head of Sports",
                            summary: "Assigned to build a gym for the student club.",
                            start_date: "2023-09-01",
                            end_date: "2025-010-01",
                            details: `
                                - Worked with other people on building a gym, as a responsible person for the final result,
                                - Managed and negotiated budget, responsible for creating a purchase and assets location plan,
                                - Greatly contributed in creating an operational order and finding people to keep the gym in operation.
                            `,
                            tags: ["Management"],
                        }),
                        createItem({
                            title: "Board Member",
                            summary: "Volunteering to rebuild a student club Buben.",
                            start_date: "2023-09-01",
                            end_date: "2025-02-01",
                            description: "Contributed in various parts of the club rebuilding, but greatly in gym rebuilding.",
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
                        start_date: "2022-09",
                        end_date: "2024-09",
                        description: "Was responsible in wide spectrum of simple gigs",
                        details: `
                            - Helped with organizations of events,
                            - Helped with coordination of certain parts of events,
                            - Mainly worked with people presenting faculty and conveying some useful information.
                        `
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
