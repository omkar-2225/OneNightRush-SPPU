import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjects, getTypes, getResources } from "@/lib/api";
import ResourceItem from "@/components/ResourceItem";

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

export default async function CategoryPage({ params }) {
  const { id, typeId } = await params;
  if (!/^\d+$/.test(id) || !/^\d+$/.test(typeId)) notFound();

  const [subjects, types, resources] = await Promise.all([
    getSubjects(),
    getTypes(id),
    getResources(id, typeId),
  ]);

  const subject = subjects?.find((s) => String(s.id) === id);
  const type = types?.find((t) => String(t.id) === typeId);
  if (!subject || !type || resources === null) notFound();

  const groups = groupByUnit(resources);

  return (
    <section>
      <Link href={`/subject/${id}`} className="crumb">
        {subject.name}
      </Link>
      <h1>{type.name}</h1>

      {groups.length === 0 && <p>Nothing is published here yet. Check back soon.</p>}

      {groups.map((group) => (
        <div key={group.key}>
          {group.number != null && (
            <h2>
              Unit {group.number}
              {group.title ? `: ${group.title}` : ""}
            </h2>
          )}
          {group.items.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </div>
      ))}
    </section>
  );
}
