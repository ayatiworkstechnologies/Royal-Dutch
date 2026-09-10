interface CatalogRecord {
  id: number;
  display_id?: number | null;
}

// Older API versions omit display_id. Derive a consistent fallback from the
// complete catalog, never the filtered rows, and reserve all persisted numbers.
export function catalogNumbers(records: readonly CatalogRecord[]): Map<number, number> {
  const sorted = [...records].sort((a, b) => a.id - b.id);
  const numbers = new Map<number, number>();
  let next = 1;
  for (const record of sorted) {
    if (typeof record.display_id === 'number' && Number.isInteger(record.display_id) && record.display_id > 0) {
      numbers.set(record.id, record.display_id);
      next = Math.max(next, record.display_id + 1);
    }
  }
  for (const record of sorted) {
    if (!numbers.has(record.id)) numbers.set(record.id, next++);
  }
  return numbers;
}

export function sortCatalog<T extends CatalogRecord>(records: readonly T[]): T[] {
  const numbers = catalogNumbers(records);
  return [...records].sort((a, b) => numbers.get(a.id)! - numbers.get(b.id)!);
}
