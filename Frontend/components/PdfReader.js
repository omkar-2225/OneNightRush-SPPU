"use client";

import dynamic from "next/dynamic";
import { Component } from "react";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <p className="hint">Loading viewer…</p>,
});

function Fallback({ url }) {
  return (
    <p className="hint">
      The in-page viewer doesn&apos;t work on this browser.{" "}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open the note in a new tab
      </a>{" "}
      instead.
    </p>
  );
}

class Boundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("PDF viewer failed:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function PdfReader({ url, title }) {
  return (
    <Boundary fallback={<Fallback url={url} />}>
      <PdfViewer url={url} title={title} />
    </Boundary>
  );
}
