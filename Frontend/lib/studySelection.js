const branches = ["First Year", "Computer Engineering"];
const years = [1, 2, 3, 4];

export function getStudySelection(params = {}) {
  let branch = branches.includes(params.branch)
    ? params.branch
    : "Computer Engineering";
  let year = Number(params.year);
  if (!years.includes(year)) year = branch === "First Year" ? 1 : 2;

  if (branch === "First Year" || year === 1) {
    branch = "First Year";
    year = 1;
  }

  const firstSemester = year * 2 - 1;
  const validSemesters = [firstSemester, firstSemester + 1];
  const requestedSemester = Number(params.semester);
  const semester = validSemesters.includes(requestedSemester)
    ? requestedSemester
    : branch === "Computer Engineering" && year === 2
      ? 3
      : firstSemester;

  return { branch, year, semester };
}

export function hasStudySelection(params = {}) {
  return (
    params.branch !== undefined &&
    params.year !== undefined &&
    params.semester !== undefined
  );
}

export function getStudyYearLabel(year) {
  return year === 1
    ? "First Year"
    : `${["", "", "Second", "Third", "Fourth"][year]} Year`;
}
