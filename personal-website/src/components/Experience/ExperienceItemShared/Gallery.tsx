import {useState} from "react";
import type {GalleryItem} from "../../../types/GalleryItem.ts";
import './Gallery.css'
import ReactMarkdown from "react-markdown";
import {dedent} from "ts-dedent";
import {GalleryFileItem} from "./GalleryFileItem.tsx";

type MediaGalleryButtonProps = {
    items: GalleryItem[];
};

export function MediaGalleryButton({items}: MediaGalleryButtonProps) {
    const [open, setOpen] = useState(false);

    if (items.length === 0) return null;

    return (
        <>
            <div style={{
                display: "flex",
            }}>
                <button className="gallery-open-button" onClick={() => setOpen(true)}>
                    <span>View media</span>

                    <svg
                        className="gallery-open-button-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            fill="currentColor"
                            d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 11.5l2.5 3.01L14.5 10l4.5 6H5l3.5-4.5Z"
                        />
                    </svg>
                </button>
            </div>

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

                            <div className="modal-window-title">Gallery</div>

                            {items.map((item, index) => (
                                <div className="gallery-item" key={index}>
                                    {item.type === "text" ? (
                                        <div className="gallery-text-item">
                                            {item.title &&
                                                <h3>{item.title}</h3>
                                            }

                                            {item.description &&
                                                <ReactMarkdown>
                                                    {dedent(item.description)}
                                                </ReactMarkdown>
                                            }
                                        </div>
                                    ) : item.type === "media" ? (
                                        <div className="gallery-media-item">
                                            {item.media_type === "image" ? (
                                                <img src={item.src} alt={item.alt ?? ""}/>
                                            ) : (
                                                <video controls>
                                                    <source src={item.src} type="video/mp4"/>
                                                </video>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="gallery-file-item">
                                            <GalleryFileItem fileType={item.file_type} data={item.data}/>
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
