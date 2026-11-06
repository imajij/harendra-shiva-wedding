// Public assets resolve against Vite's base, so the site works at a domain root
// or under a sub-path such as GitHub Pages (/harendra-shiva-wedding/).
export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`
