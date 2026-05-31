export type ExperienceFolder = {
    type: "folder";
    title: string;
    children: ExperienceNode[];
};

export type ExperienceItem = {
    type: "item";
    title: string;
    tags: string[];
    summary: string;
    details?: string[];
};

export type ExperienceNode =
    | ExperienceFolder
    | ExperienceItem;