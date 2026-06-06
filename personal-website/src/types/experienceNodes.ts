export type ExperienceFolder = {
    type: "folder";
    title: string;
    date_label?: string;
    start_date?: string;
    end_date?: string;
    summary?: string;
    description?: string;
    children: ExperienceNode[];
};

export type ExperienceItem = {
    type: "item";
    date_label: string;
    start_date: string;
    end_date?: string;
    title: string;
    tags: string[];
    summary?: string;
    description?: string;
    details?: string[];
};

export type ExperienceNode =
    | ExperienceFolder
    | ExperienceItem;
