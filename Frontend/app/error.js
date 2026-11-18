"use client";

export default function Error({ reset }) {
  return (
    <section>
      <h1>Can&apos;t load this right now</h1>
      <p className="lead">The server did not answer. Check your connection and try again.</p>
      <button type="button" className="textbtn" onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}
