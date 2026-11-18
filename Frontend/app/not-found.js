import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>That page isn&apos;t here</h1>
      <p className="lead">
        The link may be old, or the subject may have been removed.{" "}
        <Link href="/">Go to all subjects</Link>
      </p>
    </section>
  );
}
