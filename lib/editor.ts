// The person behind the rankings. Shown as a byline across the site and sent to
// search engines as the editor, so the rankings have a real name attached.
export const EDITOR = {
  name: "Ben VanderVeen",
  role: "Founder and editor",
  page: "/about#editor",
  site: "https://benvanderveen.com",
}

export const editorLd = {
  "@type": "Person",
  name: EDITOR.name,
  jobTitle: "Founder and editor, Pool Atlas",
  url: `https://poolatlas.io${EDITOR.page}`,
  sameAs: [EDITOR.site],
}
