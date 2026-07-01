import {useEffect, useState} from "react";
import "./GalleryFileItem.css";

type GalleryFileItemProps = {
    fileType: "pdf";
    data: string;
};

type PdfStatus = "loading" | "ok" | "missing";

function isPdfResponse(response: Response, url: string) {
    const contentType = response.headers.get("content-type") ?? "";

    return response.ok && (
        contentType.includes("application/pdf") ||
        (contentType.includes("application/octet-stream") && url.toLowerCase().endsWith(".pdf"))
    );
}

function PdfPreview({url}: { url: string }) {
    const [status, setStatus] = useState<PdfStatus>("loading");

    useEffect(() => {
        let cancelled = false;

        async function checkPdf() {
            setStatus("loading");

            try {
                const response = await fetch(url, {method: "HEAD"});

                if (!cancelled) {
                    setStatus(isPdfResponse(response, url) ? "ok" : "missing");
                }
            } catch {
                if (!cancelled) {
                    setStatus("missing");
                }
            }
        }

        checkPdf();

        return () => {
            cancelled = true;
        };
    }, [url]);

    if (status === "loading") {
        return <div className="gallery-file-message">Checking PDF...</div>;
    }

    if (status === "missing") {
        return <div className="gallery-file-message">PDF is missing.</div>;
    }

    return (
        <object className="gallery-pdf" data={url} type="application/pdf">
            <a href={url}>Open PDF</a>
        </object>
    );
}

export function GalleryFileItem({fileType, data}: GalleryFileItemProps) {
    if (fileType === "pdf") {
        return <PdfPreview url={data}/>;
    }

    return null;
}
