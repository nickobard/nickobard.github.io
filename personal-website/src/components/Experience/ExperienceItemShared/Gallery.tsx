import {useState} from "react";
import type {GalleryItem} from "../../../types/GalleryItem.ts";
import './Gallery.css'
import ReactMarkdown from "react-markdown";
import {dedent} from "ts-dedent";

type MediaGalleryButtonProps = {
    items: GalleryItem[];
};

export function MediaGalleryButton({items}: MediaGalleryButtonProps) {
    const [open, setOpen] = useState(false);

    if (items.length === 0) return null;

    return (
        <>
            <button onClick={() => setOpen(true)}>
                View media
            </button>

            {open && (
                <div className="modal-backdrop" onClick={() => setOpen(false)}>
                    <div
                        className="modal-window"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setOpen(false)}
                        >
                            ×
                        </button>

                        <div className="modal-content">

                            <p className="modal-window-title">Gallery</p>

                            {items.map((item, index) => (
                                <div className="gallery-item" key={index}>
                                    {item.type === "text" ? (
                                        <div className="gallery-text-item">
                                            <h3>{item.title}</h3>
                                            {item.description &&
                                                <ReactMarkdown>
                                                    {dedent(item.description)}
                                                </ReactMarkdown>


                                            }
                                        </div>

                                    ) : (
                                        <div className="gallery-media-item">
                                            {item.media_type === "image" ? (
                                                <img src={item.src} alt={item.alt ?? ""}/>
                                            ) : (
                                                <video controls>
                                                    <source src={item.src} type="video/mp4"/>
                                                </video>
                                            )}
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}