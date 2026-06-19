import { useState } from "react";
import type {MediaItem} from "../../../types/MediaItem.ts";
import './MediaContent.css'

type MediaGalleryButtonProps = {
    media: MediaItem[];
};

export function MediaGalleryButton({ media }: MediaGalleryButtonProps) {
    const [open, setOpen] = useState(false);

    if (media.length === 0) return null;

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
                            <p> Some test text</p>
                            {media.map((item, index) => (
                                <div className="media-item" key={index}>
                                    {item.type === "image" ? (
                                        <img src={item.src} alt={item.alt ?? ""} />
                                    ) : (
                                        <video controls>
                                            <source src={item.src} type="video/mp4" />
                                        </video>
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