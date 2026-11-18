import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjects, getTypes } from "@/lib/api";

export default async function SubjectPage({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const [subjects, types] = await Promise.all([getSubjects(), getTypes(id)]);
  const subject = subjects?.find((s) => String(s.id) === id);
  if (!subject || types === null) notFound();

  return (
    <section>
      <Link href="/" className="crumb">
        All subjects
      </Link>
      <h1>{subject.name}</h1>
      <p className="lead">
        <span className="code">{subject.code}</span>
      </p>

      {types.length === 0 ? (
        <p>Nothing is published for this subject yet. Check back soon.</p>
      ) : (
        <ul className="rows">
          {types.map((type) => (
            <li key={type.id}>
              <Link href={`/subject/${id}/${type.id}`} className="row">
                <span className="name">{type.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
