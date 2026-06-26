import type {ExperienceItem} from "../types/ExperienceNode.ts";

export type CountedTag = {
    tag: string;
    count: number;
};

export function countTags(items: ExperienceItem[]): CountedTag[] {
    const tagCounts = new Map<string, number>();

    function addTagWeight(tags: string[] | undefined, weight: number) {
        for (const tag of tags ?? []) {
            tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + weight);
        }
    }

    for (const item of items) {
        addTagWeight(item.core_tags, 1);
        addTagWeight(item.secondary_tags, 0.5);
        addTagWeight(item.minor_tags, 0.1);
    }

    return [...tagCounts.entries()]
        .map(([tag, count]) => ({ tag, count }));
}

export function sortCountedTags(tags: CountedTag[]): CountedTag[] {
    return [...tags].sort((a, b) => {
        const countDifference = b.count - a.count;

        if (countDifference !== 0) {
            return countDifference;
        }

        return a.tag.localeCompare(b.tag);
    });
}
