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


export type GalleryItemBase = {

};

export type MediaItem = GalleryItemBase & {
    type: "media";
    media_type: "image" | "video";
    src: string;
    alt?: string;
}

export type TextItem = GalleryItemBase & {
    type: "text";
    text_type: "content_separator";
    title: string;
    description?: string;
}

export type GalleryItem = MediaItem | TextItem;


