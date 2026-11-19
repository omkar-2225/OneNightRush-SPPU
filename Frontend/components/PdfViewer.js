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
  const pageRefs = useRef({});
  const [pageWidth, setPageWidth] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.max(1, Math.floor(entry.contentRect.width - 32)));
    });
    observer.observe(viewer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !pageCount) return;

    const pages = viewer.querySelectorAll("[data-pdf-page]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visiblePages = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visiblePages.length) {
          const currentPage = Number(visiblePages[0].target.dataset.pdfPage);
          setPageNumber(currentPage);
          setPageInput(String(currentPage));
        }
      },
      { root: viewer, threshold: [0.2, 0.5, 0.8] },
    );

    pages.forEach((page) => observer.observe(page));
    return () => observer.disconnect();
  }, [pageCount, pageWidth]);

  function goToPage(page) {
    const nextPage = Math.min(pageCount, Math.max(1, Number(page) || 1));
    setPageNumber(nextPage);
    setPageInput(String(nextPage));
    pageRefs.current[nextPage]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function zoomBy(amount) {
    setZoom((current) => Math.min(2.5, Math.max(0.5, current + amount)));
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <span className="pdf-title" title={title}>{title}</span>

        <div className="pdf-toolbar-group">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            ‹
          </button>
          <label className="pdf-page-count">
            <input
              aria-label="Current page"
              inputMode="numeric"
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value)}
              onBlur={() => goToPage(pageInput)}
              onKeyDown={(event) => {
                if (event.key === "Enter") goToPage(pageInput);
              }}
            />
            <span>/ {pageCount || "…"}</span>
          </label>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => goToPage(pageNumber + 1)}
            disabled={!pageCount || pageNumber >= pageCount}
          >
            ›
          </button>
        </div>

        <div className="pdf-toolbar-group">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => zoomBy(-0.1)}
            disabled={zoom <= 0.5}
          >
            −
          </button>
          <span className="pdf-zoom">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => zoomBy(0.1)}
            disabled={zoom >= 2.5}
          >
            +
          </button>
          <button type="button" onClick={() => setZoom(1)}>
            Fit
          </button>
        </div>
      </div>

      <div className="pdf-pages" ref={viewerRef}>
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => {
            setPageCount(numPages);
            setPageNumber(1);
            setPageInput("1");
          }}
          loading={<p className="hint">Loading PDF…</p>}
          error={
            <p className="pdf-error">
              Could not load this PDF. Check that the file is publicly accessible.
            </p>
          }
        >
          {pageWidth > 0 &&
            Array.from({ length: pageCount }, (_, index) => {
              const number = index + 1;
              return (
                <div
                  className="pdf-sheet"
                  data-pdf-page={number}
                  key={number}
                  ref={(element) => {
                    pageRefs.current[number] = element;
                  }}
                >
                  <Page
                    pageNumber={number}
                    width={Math.round(pageWidth * zoom)}
                    renderTextLayer
                    renderAnnotationLayer
                  />
                </div>
              );
            })}
        </Document>
      </div>
    </div>
  );
}
