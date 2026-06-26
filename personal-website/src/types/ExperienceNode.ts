import type {GalleryItem} from "./GalleryItem.ts";


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

type ExperienceNodeBase = {
    priority?: number;
    title: string;
    date_label?: string;
    start_date?: string;
    end_date?: string;
    summary?: string;
    description?: string;
    postscriptum?: string;
}


export type ExperienceFolder = ExperienceNodeBase & {
    type: "folder";
    children: ExperienceNode[];
};

export type ExperienceItem = ExperienceNodeBase & {
    type: "item";
    start_date: string;
    core_tags?: string[];
    secondary_tags?: string[];
    minor_tags?: string[];
    details?: string;
    show_in_list_view: boolean;
    include_tags_in_tags_count_statistics: boolean;
    gallery?: GalleryItem[];
};

export type ExperienceNode = ExperienceFolder | ExperienceItem;

