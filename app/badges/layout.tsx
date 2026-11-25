import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pool Atlas Badges for Ranked Hotels | Pool Atlas",
  description: "Ranked on Pool Atlas? Add an official badge to your hotel's website and share the recognition with your guests.",
  alternates: { canonical: "/badges" },
}

export default function BadgesLayout({ children }: { children: React.ReactNode }) {
  return children
}
