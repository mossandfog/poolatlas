import type { Metadata } from "next"

// The blog index is a client page, so its title and description live here.
export const metadata: Metadata = {
  title: "The Deep End: Hotel Pool Guides and Stories | Pool Atlas",
  description:
    "Destination guides, holiday planning and the stories behind the world's best hotel pools, from the Pool Atlas editors.",
  alternates: { canonical: "/blog" },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
