import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjects, getTypes, getResources } from "../../../../lib/api";
import ResourceItem from "../../../../components/ResourceItem";
import { getStudySelection } from "../../../../lib/studySelection";

// The backend already sorts by unit, so groups come out in order.
function groupByUnit(resources) {
  const groups = [];
  for (const resource of resources) {
    const key = resource.unit_number ?? "none";
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, number: resource.unit_number, title: resource.unit_title, items: [] };
      groups.push(group);
    }
    group.items.push(resource);
  }
  return groups;
}

export default async function CategoryPage({ params, searchParams }) {
  const { id, typeId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(typeId)) notFound();

  const selection = getStudySelection(await searchParams);
  const query = new URLSearchParams({
    branch: selection.branch,
    year: String(selection.year),
    semester: String(selection.semester),
  });
  const [subjects, types, resources] = await Promise.all([
    getSubjects(selection),
    getTypes(id),
    getResources(id, typeId),
  ]);

  const subject = subjects?.find((s) => String(s.id) === id);
  const type = types?.find((t) => String(t.id) === typeId);
  if (!subject || !type || resources === null) notFound();

  const groups = groupByUnit(resources);

  return (
    <section>
      <Link href={`/subject/${id}?${query}`} className="crumb">
        <span className="crumb-arrow" aria-hidden="true">←</span> {subject.name}
      </Link>
      <header className="page-heading">
        <span className="eyebrow">A good place to pick up</span>
        <h1>{type.name}</h1>
        <p className="lead">{subject.name} · Study material</p>
      </header>

      {groups.length === 0 && (
        <p className="empty-state">Nothing is published here yet. Check back soon.</p>
      )}

      {groups.map((group) => (
        <section className="unit-group" key={group.key}>
          {group.number != null && (
            <h2 className="unit-heading">
              <span className="unit-label">Unit {group.number}</span>
              {group.title && <span className="unit-title">{group.title}</span>}
            </h2>
          )}
          {group.items.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </section>
      ))}
    </section>
  );
}
