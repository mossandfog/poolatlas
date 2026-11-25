import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Press | Pool Atlas",
  description: "Press resources for Pool Atlas, the editors' ranking of the world's best hotel pools: fact sheet, images, ranking method and media contact.",
  alternates: { canonical: "/press" },
}

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return children
}
