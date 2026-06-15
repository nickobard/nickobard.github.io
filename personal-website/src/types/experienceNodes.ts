export function createFolder(
    data: Omit<ExperienceFolder, "type">
): ExperienceFolder {
    return {
        type: "folder",
        ...data,
    };
}

export function createItem(
    data: Omit<ExperienceItem, "type">
): ExperienceItem {
    return {
        type: "item",
        ...data,
    };
}


export type ExperienceFolder = {
    type: "folder";
    title: string;
    date_label?: string;
    start_date?: string;
    end_date?: string;
    priority?: number;
    summary?: string;
    description?: string;
    children: ExperienceNode[];
};

export type ExperienceItem = {
    type: "item";
    date_label?: string;
    start_date: string;
    end_date?: string;
    priority?: number;
    title: string;
    tags?: string[];
    summary?: string;
    description?: string;
    details?: string[];
};

export type ExperienceNode =
    | ExperienceFolder
    | ExperienceItem;
