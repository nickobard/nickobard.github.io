import type {ExperienceNode} from "../types/ExperienceNode.ts";
import {createFolder, createItem} from "../types/ExperienceNode.ts";
import {createFileItem, createMediaItem, createTextItem} from "../types/GalleryItem.ts";

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
                        core_tags: [
                            "Data Analysis",
                            "Statistics",
                            "Hypothesis Testing",
                            "Data Science",
                            "Python"],
                        secondary_tags: [
                            "Bootstrap",
                            "A/B Tests",
                            "Spreadsheets",
                            "Jupyter Notebooks"
                        ],
                        tags_scopes: ["general", "jetbrains"]
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
                        core_tags: [
                            "Data Analysis",
                            "Python",
                            "Statistics",
                            "Mathematics",
                            "Multithreading",
                            "Research"
                        ],
                        secondary_tags: [
                            "Spreadsheets",
                            "Jupyter Notebooks"
                        ],
                        tags_scopes: ['general', 'jetbrains']
                    }),
                ]
            }),

            createItem({
                title: "Technical Assistant",
                summary: "Summer school for teenagers about AI from AI dětem.",
                start_date: "2024-07-22",
                end_date: "2024-07-25",
                description: "As an AI program student I was as a technical assistant to lectors, guiding students technically and making one technical presentation for them.",
                core_tags: ["Teaching", "Supervising", "Python", "Presentation"],
                secondary_tags: ["Machine Learning", "Deep Learning", "Jupyter Notebooks", "PyTorch"],
                tags_scopes: ["general"],
                gallery: [
                    createTextItem({
                        text_type: "content_separator",
                        title: "Some photos from the summer school",
                        description: "Students at the start of the summer school working on their sprint projects:"
                    }),
                    createMediaItem({
                        media_type: "image",
                        src: "/media/ai-detem-summer-school/ai-detem-summer-students-working.png",
                        alt: "Image showing students working on their projects."
                    }),
                    createTextItem({
                        text_type: "content_separator",
                        description: "Technical assistants presenting their presentation about data poisoning of artificial intelligence models:"
                    }),
                    createMediaItem({
                        media_type: "image",
                        src: "/media/ai-detem-summer-school/ai-detem-summer-data-poisoning-presentation.png"
                    }),
                    createTextItem({
                        text_type: "content_separator",
                        description: "Students showcasing their projects to other teams:",
                    }),
                    createMediaItem({
                        media_type: "image",
                        src: "/media/ai-detem-summer-school/ai-detem-summer-students-presenting.png"
                    })
                ],
                details: `
                    - Guided teams of teenage students in their sprints of creating AI applications,
                    - Advised on some technical details regarding AI models and principles how it works,
                    - Created a presentation about data poisoning of neural network, showing the students dangers of improperly trained networks.
                `,
                postscriptum: "[Source code](https://github.com/nickobard/ai-summer-school)"
            }),
            createFolder({
                    title: 'Management at student club',
                    description: "Greatly contributed in rebuilding a student club in a dormitory after reconstruction.",
                    children: [
                        createItem({
                            title: "Head of Sports",
                            summary: "Assigned to build a gym for the student club.",
                            start_date: "2023-09",
                            end_date: "2025-11",
                            details: `
                                - Worked with other people on building a gym, as a responsible person for the final result,
                                - Managed and negotiated budget, responsible for creating a purchase and assets location plan,
                                - Greatly contributed in creating an operational order and finding people to keep the gym in operation.
                            `,
                            gallery: [
                                createTextItem({
                                    text_type: "content_separator",
                                    title: "The state of the gym at the beginning",
                                }),
                                createMediaItem({
                                    media_type: "image",
                                    src: "/media/buben-club/gym-before-1.jpg"
                                }),
                                createMediaItem({
                                    media_type: "image",
                                    src: "/media/buben-club/gym-before-2.jpg"
                                }),
                                createTextItem({
                                    text_type: "content_separator",
                                    title: "The state of the gym after the job is done (mostly)",
                                }),
                                createMediaItem({
                                    media_type: "image",
                                    src: "/media/buben-club/gym-after-1.jpg"
                                }),
                                createMediaItem({
                                    media_type: "image",
                                    src: "/media/buben-club/gym-after-2.jpg"
                                }),
                                createMediaItem({
                                    media_type: "image",
                                    src: "/media/buben-club/gym-after-3.jpg"
                                })
                            ],
                            core_tags: ["Management", "Volunteering"],
                            secondary_tags: ["Human Resources", "Communication", "Project Management", "Organization Skills"],
                            postscriptum: "P.S. This was a hard, collective job, done in our free time, thank you to all who contributed to this (we argued, we were upset, but it doesn't matter, we did a good job for people and earned some life experience)."
                        }),
                        createItem({
                            title: "Board Member",
                            summary: "Volunteering to rebuild a student club Buben.",
                            start_date: "2023-09",
                            end_date: "2025-02",
                            description: "Contributed in various parts of the club rebuilding, but greatly in gym rebuilding.",
                            core_tags: ["Management", "Volunteering"],
                            secondary_tags: ["Communication", "Presentation", "Organization Skills", 'IT Infrastructure'],
                            details: `
                                - Discussed important matters of the student club,
                                - Contributed to broad number of activities and overall club improvements:
                                    - Mainly was responsible for Sport Section revival and gym renovation,
                                    - Helped to set up some IT infrastructure at the beginning,
                                    - Was a helping hand at some party events,
                                    - Some help with some minor gigs here and there.
                            `,
                            postscriptum: "[Club Instagram](https://www.instagram.com/bubenklub/?utm_source=ig_web_button_share_sheet)"
                        }),
                    ]
                }
            ),
            createFolder({
                title: "University Activities",
                description: "Activities during my education period at FIT CTU.",
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
                        `,
                        core_tags: ["Communication", "Presentation"],
                        secondary_tags: ["Freelancing"],
                        minor_tags: ['Robotics']
                    }),
                    createItem({
                        title: "Research Summer",
                        summary: "Research project on fuzzy keyword matching.",
                        start_date: "2023-06",
                        end_date: "2023-09",
                        details: `
                            - Worked under mentoring of PhD Researchers,
                            - Created a small dataset and used state-of-the-art models to establish a baseline,
                                - Worked with Hugging Face and other frameworks to use BERT, Word2Vec and other models.
                        `,
                        core_tags: [
                            "Hugging Face",
                            "Python",
                            "Pandas",
                            "NumPy",
                            "Research",
                            "Transformers",
                            "NLP",
                            "PyTorch",
                            "Machine Learning",
                            "Deep Learning",
                            "BERT",
                            "Word2Vec"
                        ],
                        secondary_tags: [
                            "Git",
                        ]
                    })
                ]
            })

        ],
    }),
    createFolder({
        title: "Education",
        summary: "Formal education in university or some other courses.",
        description: "So far I have only the Bc program studied at Faculty of Information Technologies in Czech Technical University in Prague.",
        priority: 2,
        children: [
            createFolder({
                title: "Bachelor Program",
                summary: "Description of my thesis and other core projects during my studies.",
                description: "I started as a software engineer and later switched to data science program.",
                start_date: "2022-09-01",
                end_date: "2026-06-24",
                children: [
                    createFolder({
                        title: "Data Science Program",
                        priority: 1,
                        summary: "My major program.",
                        start_date: "2023-09-01",
                        end_date: "2026-06-24",
                        children: [
                            createItem({
                                title: "Enhancing Fake News Classification with Advanced NLP Models",
                                summary: "Bachelor Thesis",
                                description: "This is my bachelor thesis where I used transformers for fake news classification.",
                                start_date: "2024-09-01",
                                end_date: "2026-06-24",
                                gallery: [
                                    createTextItem({
                                        text_type: "content_separator",
                                        title: "Bachelor's Thesis",
                                        description: "View my thesis pdf file here. The source code is also available [here](https://github.com/nickobard/FIT-CTU-Bc-Work-Enhancing-Fake-News-Classification)."
                                    }),
                                    createFileItem({
                                        file_type: "pdf",
                                        data: "/media/education/bachelors-thesis-fake-news-classification/fake_news_detection.pdf"
                                    })
                                ],
                                details: `
                                    - Analyzed datasets for additional insights about articles token lengths,
                                    - Used transformer models like BERT, GPT2, RoBERTa, DistilBERT to improve classification scores,
                                        - Achieved higher scores (80% - 100%, depending on dataset), even with simplified models.
                                    - Implemented everything in tandem with MLFlow for proper training monitoring.
                                `
                            }),
                            createItem({
                                title: "Machine and Deep Learning Courses",
                                start_date: "2024-09",
                                end_date: "2025-07",
                                details: `
                                    - Used classic Machine Learning models to perform different tasks on different datasets,
                                        - Decision Trees, Regressions, SVMs, PCA, LDA, etc. etc. etc. 
                                    - Did some Deep Learning tasks in Deep Learning course
                                        - Neural Networks, Convolutions,
                                        - Manually computed backpropagation for a simple neural network to understand the mechanism closely                                
                                `
                            }),
                            createItem({
                                title: "Data Analysis Courses",
                                start_date: "2024-09",
                                end_date: "2025-07",
                                details: `
                                    - Performed simple explorative data analysis on different datasets,
                                    - Extracted some insights from the data,
                                    - Used predictive models to automatically extract some knowledge form the data
                                `
                            }),
                            createItem({
                                title: "Dungeon Keeper Database",
                                summary: 'Database for Devils to facilitate their Soul Farms',
                                start_date: "2023-02",
                                end_date: "2023-07",
                                details: `
                                    - Database with 12 entities and non-trivial relationships between them
                                        - Including at least one loop relation
                                    - Conducted 27 queries, covering most of the queries types the language can provide
                                `
                            }),
                            createItem({
                                title: "Other courses in Data Science Program",
                                start_date: "2023-09-01",
                                end_date: "2026-06-24",
                                description: "There were a lot of other courses during the program, i.e. mathematical or other DS courses like Knowledge Systems, etc. The full list of courses you can find on [my absolved courses](https://github.com/nickobard/Education-The-Bachelors-Program) pages."
                            })
                        ]
                    }),
                    createFolder({
                        title: "Software Engineering Program",
                        priority: 3,
                        summary: "My first interest, which is secondary to Data Science.",
                        start_date: "2021-09-01",
                        end_date: "2023-09-01",
                        children: [
                            createItem({
                                title: "Wizview - Team Software Project",
                                description: "I was a backend lead at this project, mainly because nobody new python except me.",
                                start_date: "2023-02",
                                end_date: "2023-07",
                                details: `
                                    - Set up the communication infrastructure with the team (Discord),
                                    - Set up environment for team members to start development,
                                    - Monitored the tasks completion and set up the baseline for fair evaluation of members,
                                    - Set up DevOps for backend, and conducted code reviews for the rest. 
                                `
                            }),
                            createItem({
                                title: 'Time Tracker App',
                                summary: "Ala Toggl Track",
                                start_date: "2023-09",
                                end_date: "2024-01",
                                description: "Full Stack application (backend, fronted and devops) for measuring (precious) time."
                            }),
                            createItem({
                                title: 'Pacman Game',
                                summary: 'Hardcore C++ app ([BFG Division](https://www.youtube.com/watch?v=QHRuTYtSbJQ) vibes turned on)',
                                start_date: "2023-02",
                                end_date: "2023-07",
                                details: `
                                    - Created a Pacman game with simple AI ghost with great retro visuals,
                                    - Used OOP programming, inheritance and polymorphism to create extensible code,
                                    - Used Game Design patterns to create a good architecture of the game engine.
                                `,
                                gallery: [
                                    createTextItem({
                                        text_type: "content_separator",
                                        title: "Visual Showcase of the Pacman Game",
                                    }),
                                    createMediaItem({
                                        media_type: "image",
                                        src: '/media/pa2-pacman-game-project-assets/pacman_game.jpg',
                                        alt: "Pacman Game Screenshot",
                                    }),
                                    createMediaItem({
                                        media_type: "video",
                                        src: '/media/pa2-pacman-game-project-assets/pacman_showcase.mp4',
                                        alt: "Pacman Showcase"
                                    }),
                                    createTextItem({
                                        text_type: "content_separator",
                                        title: "Showcase of Doxygen Documentation",
                                        description: "Some pages from documentation. Full documentation PDF is available in [the source code](https://github.com/nickobard/CPP-Pacman-Game/blob/main/refman.pdf).",
                                    }),
                                    createMediaItem({
                                        media_type: "image",
                                        src: '/media/pa2-pacman-game-project-assets/documentation_game_actor.png',
                                        alt: "Documentation Game Actor"
                                    }),
                                    createMediaItem({
                                        media_type: "image",
                                        src: '/media/pa2-pacman-game-project-assets/documentation_game_manager.png',
                                        alt: "Documentation Game Manager"
                                    })
                                ],
                                postscriptum: '[Link to full source code.](https://github.com/nickobard/CPP-Pacman-Game)'
                            })
                        ]
                    }),
                    createItem({
                        title: "Research Summer",
                        priority: 2,
                        summary: "Research project on fuzzy keyword matching.",
                        start_date: "2023-06-01",
                        end_date: "2026-02-01",
                        show_in_list_view: false,
                        include_tags_in_tags_count_statistics: false,
                        details: `
                            - Worked under mentoring of PhD Researchers,
                            - Created a small dataset and used state-of-the-art models to establish a baseline,
                                - Worked with Hugging Face and other frameworks to use BERT, Word2Vec and other models.
                                `
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
                include_tags_in_tags_count_statistics: false
            })
        ]
    })
];
