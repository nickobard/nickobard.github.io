import ReactMarkdown from "react-markdown";
import {dedent} from "ts-dedent";
import type {ExperienceItem} from "../../../types/ExperienceNode.ts";
import './ItemInnerContent.css'
import {MediaGalleryButton} from "./MediaContent.tsx";

type Props = {
    item: ExperienceItem;
    contentRef: React.RefObject<HTMLDivElement | null>;
}

export function ItemInnerContent({item, contentRef}: Props) {

    return (
        <div ref={contentRef} className="details-content-inner">
            {item.description && (
                <div className="experience-item-description">
                    <ReactMarkdown>
                        {dedent(item.description)}
                    </ReactMarkdown>
                </div>
            )}

            {item.details && (
                <div className="details-list">
                    <ReactMarkdown>
                        {dedent(item.details)}
                    </ReactMarkdown>
                </div>
            )}

            {item.media_files && item.media_files.length > 0 &&
                <MediaGalleryButton media={item.media_files}/>
            }

            {item.postscriptum && (
                <div className="experience-tree-item-postscriptum">
                    <ReactMarkdown>{dedent(item.postscriptum)}</ReactMarkdown>
                </div>
            )}
        </div>
    )
}