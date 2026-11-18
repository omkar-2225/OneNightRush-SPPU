import Link from "next/link";
import BrowseFilters from "../../components/BrowseFilters";
import { getStudySelection } from "../../lib/studySelection";

export default async function BrowsePage({ searchParams }) {
  const params = await searchParams;
  const selection = getStudySelection(params);

  return (
    <div className="browse-page">
      <Link href="/" className="crumb">
        <span className="crumb-arrow" aria-hidden="true">←</span> Home
      </Link>

      <header className="browse-heading">
        <span className="browse-university">SPPU UNIVERSITY</span>
        <span className="browse-pattern">2024 PATTERN</span>
        <h1>Find your study material.</h1>
        <p>Choose your branch, year and semester to open your subject shelf.</p>
      </header>

      <BrowseFilters
        branch={selection.branch}
        year={selection.year}
        semester={selection.semester}
      />

      <section className="search-prompt">
        <span className="search-prompt-mark" aria-hidden="true">↳</span>
        <div>
          <h2>Your subjects will show up on the next page.</h2>
          <p>Choose your branch, year and semester, then search to continue.</p>
        </div>
      </section>
    </div>
  );
}
