export type Gallery = {
    view_button_name?: string;
    items: GalleryItem[];
}


export function createMediaItem(
    data: Omit<MediaItem, "type">
): MediaItem {
    return {
        type: "media",
        ...data,
    };
}

export function createTextItem(
    data: Omit<TextItem, "type">
): TextItem {
    return {
        type: "text",
        ...data
    }
}

export function createFileItem(
    data: Omit<FileItem, "type">
): FileItem {
    return {
        type: "file",
        ...data
    }
}


export type GalleryItemBase = {};

export type MediaItem = GalleryItemBase & {
    type: "media";
    media_type: "image" | "video";
    src: string;
    alt?: string;
}

export type TextItem = GalleryItemBase & {
    type: "text";
    text_type: "content_separator";
    title?: string;
    description?: string;
}

export type FileItem = GalleryItemBase & {
    type: "file";
    file_type: "pdf";
    data: string;
}

export type GalleryItem = MediaItem | TextItem | FileItem;


