const COMBINING_MARKS = /[̀-ͯ]/g;

/** Turns a recipe title into a URL- and filename-safe slug. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(COMBINING_MARKS, "") // strip accents (e.g. e-acute -> e)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
