"use client";

import { useState } from "react";

const yearOptions = [
  { value: 1, label: "First Year · FE" },
  { value: 2, label: "Second Year · SE" },
  { value: 3, label: "Third Year · TE" },
  { value: 4, label: "Fourth Year · BE" },
];

export default function BrowseFilters({ branch: initialBranch, year: initialYear, semester: initialSemester }) {
  const [branch, setBranch] = useState(initialBranch);
  const [year, setYear] = useState(initialYear);
  const [semester, setSemester] = useState(initialSemester);
  const semesters = [year * 2 - 1, year * 2];
  const isFirstYear = branch === "First Year";

  function changeBranch(event) {
    const nextBranch = event.target.value;
    setBranch(nextBranch);
    if (nextBranch === "First Year") {
      setYear(1);
      setSemester(1);
    } else if (year === 1) {
      setYear(2);
      setSemester(3);
    }
  }

  function changeYear(event) {
    const nextYear = Number(event.target.value);
    setYear(nextYear);
    setSemester(nextYear * 2 - 1);
  }

  return (
    <form action="/browse" method="get" className="browse-filters">
      <label className="filter-field">
        <span>Branch</span>
        <select name="branch" value={branch} onChange={changeBranch}>
          <option value="First Year">First Year · common to all branches</option>
          <option value="Computer Engineering">Computer Engineering</option>
        </select>
      </label>

      <label className="filter-field">
        <span>Year</span>
        <select
          name="year"
          value={year}
          onChange={changeYear}
          disabled={isFirstYear}
        >
          {yearOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isFirstYear && <input type="hidden" name="year" value="1" />}
      </label>

      <label className="filter-field">
        <span>Semester</span>
        <select
          name="semester"
          value={semester}
          onChange={(event) => setSemester(Number(event.target.value))}
        >
          {semesters.map((value) => (
            <option key={value} value={value}>Semester {value}</option>
          ))}
        </select>
      </label>

      <button className="button browse-submit" type="submit">
        Show subjects <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
