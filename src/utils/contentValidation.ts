export function assertUniqueValues(values: readonly string[], label: string): void {
  const duplicates = values.filter(
    (value, index) => values.indexOf(value) !== index
  );

  if (duplicates.length > 0) {
    throw new Error(
      `Duplicate ${label}: ${[...new Set(duplicates)].join(", ")}`
    );
  }
}

export function assertUniqueTitles(
  entries: ReadonlyArray<{ title: string }>,
  label: string
): void {
  assertUniqueValues(
    entries.map(entry => entry.title.trim().toLowerCase()),
    `${label} titles`
  );
}
