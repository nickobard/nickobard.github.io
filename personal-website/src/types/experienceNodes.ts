export function createFolder(
    data: Omit<ExperienceFolder, "type" | "position">
): ExperienceFolder {
    return {
        type: "folder",
        position: "flexible",
        ...data,
    };
}

export function createItem(
    data: Omit<ExperienceItem, "type" | "position">
): ExperienceItem {
    return {
        type: "item",
        position: "flexible",
        ...data,
    };
}


export type ExperienceFolder = {
    type: "folder";
    title: string;
    date_label?: string;
    start_date?: string;
    end_date?: string;
    position: "fixed" | "flexible";
    summary?: string;
    description?: string;
    children: ExperienceNode[];
};

export type ExperienceItem = {
    type: "item";
    date_label?: string;
    start_date: string;
    end_date?: string;
    position: "fixed" | "flexible";
    title: string;
    tags?: string[];
    summary?: string;
    description?: string;
    details?: string[];
};

export type ExperienceNode =
    | ExperienceFolder
    | ExperienceItem;
