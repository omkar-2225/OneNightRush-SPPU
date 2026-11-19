"use client";

import "./pdfPolyfills";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2;

function LoadError({ url }) {
  return (
    <p className="pdf-error">
      Could not load this PDF here.{" "}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open it in a new tab
      </a>
      .
    </p>
  );
}

function LazyPage({ number, width, scrollerRef }) {
  const boxRef = useRef(null);
  const [show, setShow] = useState(number <= 2);
  const [height, setHeight] = useState(Math.round(width * 1.41));

  useEffect(() => {
    setHeight(Math.round(width * 1.41));
  }, [width]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        } else {
          setHeight(box.offsetHeight);
          setShow(false);
        }
      },
      { root: scrollerRef.current, rootMargin: "150% 0px" },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [scrollerRef]);

  return (
    <div
      className="pdf-sheet"
      data-pdf-page={number}
      ref={boxRef}
      style={{ minHeight: height, width }}
    >
      {show && (
        <Page
          pageNumber={number}
          width={width}
          devicePixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      )}
    </div>
  );
}

export default function PdfViewer({ url, title }) {
  const scrollerRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new ResizeObserver(([entry]) => {
      setBaseWidth(Math.max(1, Math.floor(entry.contentRect.width - 24)));
    });
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !pageCount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setPageNumber(Number(best.target.dataset.pdfPage));
      },
      { root: scroller, threshold: [0.2, 0.5, 0.8] },
    );
    scroller
      .querySelectorAll("[data-pdf-page]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pageCount, baseWidth, zoom]);

  function goToPage(target) {
    const scroller = scrollerRef.current;
    const page = Math.min(pageCount, Math.max(1, target));
    const element = scroller?.querySelector(`[data-pdf-page="${page}"]`);
    if (element) scroller.scrollTo({ top: element.offsetTop, behavior: "smooth" });
  }

  function zoomBy(amount) {
    setZoom((current) =>
      Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, Math.round((current + amount) * 10) / 10),
      ),
    );
  }

  const width = Math.round(baseWidth * zoom);

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <span className="pdf-title" title={title}>
          {title}
        </span>
        <div className="pdf-toolbar-group">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            ‹
          </button>
          <span className="pdf-page-count">
            {pageNumber} / {pageCount || "…"}
          </span>
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
            onClick={() => zoomBy(-0.2)}
            disabled={zoom <= MIN_ZOOM}
          >
            −
          </button>
          <span className="pdf-zoom">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => zoomBy(0.2)}
            disabled={zoom >= MAX_ZOOM}
          >
            +
          </button>
        </div>
      </div>

      <div className="pdf-pages" ref={scrollerRef}>
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          loading={<p className="hint">Loading PDF…</p>}
          error={<LoadError url={url} />}
        >
          {width > 0 &&
            Array.from({ length: pageCount }, (_, index) => (
              <LazyPage
                key={index + 1}
                number={index + 1}
                width={width}
                scrollerRef={scrollerRef}
              />
            ))}
        </Document>
      </div>
    </div>
  );
}
