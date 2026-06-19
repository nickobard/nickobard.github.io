import type {MediaItem} from "./MediaItem.ts";


export function createFolder(
    data: Omit<ExperienceFolder, "type">
): ExperienceFolder {
    return {
        type: "folder",
        ...data,
    };
}

export function createItem(
    data: Omit<ExperienceItem, "type" | "show_in_list_view" | "include_tags_in_tags_count_statistics"> & {
        show_in_list_view?: boolean;
        include_tags_in_tags_count_statistics?: boolean;
    }
): ExperienceItem {
    return {
        type: "item",
        show_in_list_view: true,
        include_tags_in_tags_count_statistics: true,
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
    postscriptum?: string;
};

export type ExperienceItem = {
    type: "item";
    date_label?: string;
    start_date: string;
    end_date?: string;
    priority?: number;
    title: string;
    core_tags?: string[];
    secondary_tags?: string[];
    summary?: string;
    description?: string;
    details?: string;
    postscriptum?: string;
    show_in_list_view: boolean;
    include_tags_in_tags_count_statistics: boolean;
    media_files?: MediaItem[];
};

export type ExperienceNode =
    | ExperienceFolder
    | ExperienceItem;
