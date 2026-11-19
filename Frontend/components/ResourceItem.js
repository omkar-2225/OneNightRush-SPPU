"use client";

import { useState } from "react";
import PdfReader from "./PdfReader";

// Turns a stored link into something an iframe can show. Returns null if it can't.
function embedUrl(url, kind) {
  try {
    const u = new URL(url);
    if (kind === "youtube") {
      const id = u.hostname.includes("youtu.be")
        ? u.pathname.slice(1)
        : u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "drive.google.com") {
      return url.replace(/\/view.*$/, "/preview");
    }
    if (kind === "file") return url;
  } catch {
    // A badly typed URL in the database should not crash the page.
  }
  return null;
}

export default function ResourceItem({ resource }) {
  const [open, setOpen] = useState(false);
  const src = embedUrl(resource.url, resource.link_kind);
  const isPdf =
    resource.link_kind === "file" && /\.pdf(?:$|[?#])/i.test(resource.url);

  return (
    <div className="item">
      <div className="item-head">
        <span className="item-title">{resource.title}</span>
        <span className="item-actions">
          {src && (
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
              {open ? "Close" : "Read here"}
            </button>
          )}
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Open in new tab
          </a>
        </span>
      </div>

      {open && src && (
        <>
          {isPdf ? (
            <PdfReader url={resource.url} title={resource.title} />
          ) : (
            <>
              <iframe
                className="viewer"
                src={src}
                title={resource.title}
                loading="lazy"
                allowFullScreen
              />
              <p className="hint">
                Not loading on your phone? Use Open in new tab.
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}
