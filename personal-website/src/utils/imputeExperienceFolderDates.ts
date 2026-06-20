import type {ExperienceFolder, ExperienceItem, ExperienceNodeBase} from "../types/ExperienceNode.ts";

const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function dateValue(date?: string): number | undefined {
    if (!date) {
        return undefined;
    }

    const value = new Date(date).getTime();

    return Number.isNaN(value) ? undefined : value;
}

function endDateValue(date?: string): number {
    return dateValue(date) ?? Number.POSITIVE_INFINITY;
}

function compareDateStrings(a: string, b: string): number {
    return dateValue(a)! - dateValue(b)!;
}

function formatDateLabel(date: string): string {
    const parsedDate = new Date(date);

    return `${MONTH_LABELS[parsedDate.getUTCMonth()]} ${parsedDate.getUTCFullYear()}`;
}

function formatDateRangeLabel(startDate?: string, endDate?: string): string | undefined {
    if (!startDate) {
        return undefined;
    }

    return `${formatDateLabel(startDate)} - ${endDate ? formatDateLabel(endDate) : "Present"}`;
}

function imputeItemDateLabel(item: ExperienceItem): ExperienceItem {
    return {
        ...item,
        date_label: item.date_label ?? formatDateRangeLabel(item.start_date, item.end_date),
    };
}

function imputeFolderDates(folder: ExperienceFolder): ExperienceFolder {
    const children = folder.children.map(imputeExperienceFolderDates);
    const startDates = children
        .map((child) => child.start_date)
        .filter((date): date is string => date !== undefined);
    const endDates = children
        .map((child) => child.end_date)
        .filter((date): date is string => date !== undefined);
    const maxEndDateValue = Math.max(...children.map((child) => endDateValue(child.end_date)));
    const imputedStartDate = startDates.length > 0
        ? startDates.reduce((minDate, date) => compareDateStrings(date, minDate) < 0 ? date : minDate)
        : undefined;
    const imputedEndDate = maxEndDateValue === Number.POSITIVE_INFINITY || endDates.length === 0
        ? undefined
        : endDates.reduce((maxDate, date) => compareDateStrings(date, maxDate) > 0 ? date : maxDate);
    const startDate = folder.start_date ?? imputedStartDate;
    const endDate = folder.end_date ?? imputedEndDate;

    return {
        ...folder,
        start_date: startDate,
        end_date: endDate,
        date_label: folder.date_label ?? formatDateRangeLabel(startDate, endDate),
        children,
    };
}

export function imputeExperienceFolderDates(node: ExperienceNodeBase): ExperienceNodeBase {
    if (node.type === "item") {
        return imputeItemDateLabel(node);
    }

    return imputeFolderDates(node);
}

export function imputeExperienceTreeFolderDates(nodes: ExperienceNodeBase[]): ExperienceNodeBase[] {
    return nodes.map(imputeExperienceFolderDates);
}
