// Shared handle to the single Lenis instance, kept out of the component file
// so fast-refresh stays happy (components-only exports there).
let lenis = null;
export const setLenis = (instance) => { lenis = instance; };
export const getLenis = () => lenis;
