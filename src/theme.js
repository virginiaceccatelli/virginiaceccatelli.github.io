/*
 * Which paper each route is printed on. Cream pages carry the big hand-drawn
 * line art; maroon pages are full-bleed dirty red with cream type. The actual
 * colours live in index.css as CSS variables — this only picks a side.
 */
export const PAGE_THEME = {
  "/": "cream",
  "/about": "maroon",
  "/experience": "maroon",
  "/projects": "cream",
  "/writing": "cream",
};

export const themeFor = (pathname) => PAGE_THEME[pathname] ?? "cream";

/*
 * Literal values, for the places that cross-fade between the two palettes and
 * therefore cannot swap the variables underneath themselves mid-transition.
 */
export const COLORS = {
  cream: "#f2eee5",
  maroon: "#9c3a31",
  ink: "#191512",
};

/*
 * The wordmark sitting top-left in bold caps, mirroring the reference layout.
 * Deliberately constant: each page already states its own name in display type,
 * so repeating it in the bar just doubled it up at the top of every page.
 */
export const WORDMARK = "V. Ceccatelli";
