import ReactMarkdown from "react-markdown";
import {dedent} from "ts-dedent";
import type {ExperienceItem} from "../../../types/ExperienceNode.ts";
import './ItemInnerContent.css'
import {MediaGalleryButton} from "./Gallery.tsx";

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

            {item.gallery && item.gallery.length > 0 &&
                <MediaGalleryButton items={item.gallery}/>
            }

            {item.postscriptum && (
                <div className="experience-node-postscriptum">
                    <ReactMarkdown>{dedent(item.postscriptum)}</ReactMarkdown>
                </div>
            )}
        </div>
    )
}