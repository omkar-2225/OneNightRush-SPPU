"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfViewer({ url, title }) {
  const viewerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.max(1, Math.floor(entry.contentRect.width - 24)));
    });
    observer.observe(viewer);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pdf-viewer" ref={viewerRef}>
      <div className="pdf-controls">
        <button
          type="button"
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <span>
          Page {pageNumber}{pageCount ? ` of ${pageCount}` : ""}
        </span>
        <button
          type="button"
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={!pageCount || pageNumber >= pageCount}
        >
          Next
        </button>
      </div>

      <div className="pdf-page">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => {
            setPageCount(numPages);
            setPageNumber(1);
          }}
          loading={<p className="hint">Loading PDF…</p>}
          error={
            <p className="pdf-error">
              Could not load this PDF. Check that the file is publicly accessible.
            </p>
          }
        >
          {pageWidth > 0 && (
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              renderTextLayer
              renderAnnotationLayer
              aria-label={`${title}, page ${pageNumber}`}
            />
          )}
        </Document>
      </div>
    </div>
  );
}
