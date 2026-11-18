import Link from "next/link";
import { getSubjects } from "@/lib/api";
import { examLabel } from "@/lib/exams";

export default async function Home() {
  const subjects = await getSubjects();

  return (
    <section>
      <h1>Pick your paper</h1>
      <p className="lead">
        Notes, past papers and what to study first for Computer Engineering Sem 3.
        Free, no login.
      </p>

      {subjects.length === 0 ? (
        <p>No subjects are listed yet. Check back soon.</p>
      ) : (
        <ul className="rows">
          {subjects.map((subject) => {
            const exam = examLabel(subject.code);
            return (
              <li key={subject.id}>
                <Link href={`/subject/${subject.id}`} className="row">
                  <span className="name">{subject.name}</span>
                  <span className="code">{subject.code}</span>
                  {exam && (
                    <span className="when">
                      <strong>{exam.date}</strong> <span>{exam.note}</span>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
