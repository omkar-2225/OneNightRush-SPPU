"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <h1>Something went wrong on this page</h1>
      <p className="lead">
        Reload to try again. If it keeps happening, tell us on the feedback form.
        {error?.digest ? ` (Error code: ${error.digest})` : ""}
      </p>
      <p>
        <button type="button" className="textbtn" onClick={() => reset()}>
          Reload
        </button>{" "}
        <Link href="/">Go to the home page</Link>
      </p>
    </section>
  );
}
