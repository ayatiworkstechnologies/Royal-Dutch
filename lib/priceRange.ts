export type PriceValue = number | string | null;

const PRICE_PATTERN = /^\d+(?:\.\d{1,2})?(?:-\d+(?:\.\d{1,2})?)?$/;

export function normalizePrice(value: string): string {
  return value
    .trim()
    .replace(/,/g, '')
    // Accept hyphen, en/em dash, non-breaking hyphen, and the Unicode minus.
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s*-\s*/g, '-');
}

export function isValidPrice(value: string): boolean {
  if (!value.trim()) return true;
  const normalized = normalizePrice(value);
  if (!PRICE_PATTERN.test(normalized)) return false;
  const [minimum, maximum] = normalized.split('-').map(Number);
  return maximum === undefined || maximum >= minimum;
}

export function getPriceBounds(value: Exclude<PriceValue, null>): [number, number] | null {
  const normalized = normalizePrice(String(value));
  if (!isValidPrice(normalized)) return null;
  const [minimum, maximum = minimum] = normalized.split('-').map(Number);
  return [minimum, maximum];
}

export function formatPriceValue(value: Exclude<PriceValue, null>): string {
  const bounds = getPriceBounds(value);
  if (!bounds) return String(value);
  const format = (amount: number) => amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return bounds[0] === bounds[1]
    ? format(bounds[0])
    : `${format(bounds[0])}\u2013${format(bounds[1])}`;
}
