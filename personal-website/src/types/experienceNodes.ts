export type ExperienceFolder = {
    type: "folder";
    title: string;
    summary?: string;
    description?: string;
    children: ExperienceNode[];
};

export type ExperienceItem = {
    type: "item";
    title: string;
    tags: string[];
    summary?: string;
    description?: string;
    details?: string[];
};

export type ExperienceNode =
    | ExperienceFolder
    | ExperienceItem;
