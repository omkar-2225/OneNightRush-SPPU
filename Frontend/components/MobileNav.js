"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const feedbackUrl = "https://github.com/omkar-2225/OneNightRush-SPPU/issues/new";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav">
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        <span className={`burger-icon${open ? " is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      {open && (
        <nav className="mobile-menu-panel" id="mobile-menu" aria-label="Mobile navigation">
          <Link className="mobile-menu-link" href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link className="mobile-menu-link" href="/browse" onClick={() => setOpen(false)}>
            Browse subjects
          </Link>
          <a
            className="mobile-menu-link"
            href={feedbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Feedback
          </a>
          <ThemeToggle className="mobile-menu-theme" showLabel />
          <Link
            className="mobile-menu-link mobile-menu-cta"
            href="/browse"
            onClick={() => setOpen(false)}
          >
            Get started <span aria-hidden="true">→</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
