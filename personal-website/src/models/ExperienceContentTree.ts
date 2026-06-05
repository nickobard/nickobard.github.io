import {type RefObject} from "react";

export class ExperienceContentNode {
    public type: string;
    public parentNode: ExperienceContentNode | null;
    public thisNodeRef: RefObject<HTMLDivElement | null> | null;
    public children: ExperienceContentNode[];
    public setContentHeight: ((height: number) => void) | null;

    constructor(type: string,
                parentNode: ExperienceContentNode | null,
                thisRef: RefObject<HTMLDivElement | null> | null,
                setContentHeight: ((height: number) => void) | null) {
        this.type = type;
        this.parentNode = parentNode;
        this.thisNodeRef = thisRef;
        this.setContentHeight = setContentHeight;
        this.children = [];

    }

    public addChild(node: ExperienceContentNode) {
        if (!this.children.includes(node)) {
            this.children.push(node);
        }

    }

    public getContentHeight() {
        return this.thisNodeRef?.current?.scrollHeight;
    }

}


export class ExperienceContentTree {
    public root: ExperienceContentNode;

    constructor() {
        this.root = new ExperienceContentNode('root',
            null,
            null, null);
    }

    public static updateTreeContentHeight(node: ExperienceContentNode) {
        const scrollHeightDelta = node.getContentHeight();

        if (scrollHeightDelta === undefined) {
            return;
        }

        if (typeof node.setContentHeight === "function") {
            node.setContentHeight(scrollHeightDelta);
        }

        let current = node.parentNode;

        while (current !== null) {
            const currentScrollHeight = current.getContentHeight();

            if (
                currentScrollHeight !== undefined &&
                typeof current.setContentHeight === "function"
            ) {
                current.setContentHeight(currentScrollHeight + scrollHeightDelta);
            }

            current = current.parentNode;
        }
    }

}

