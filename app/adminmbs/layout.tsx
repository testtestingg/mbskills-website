import type { Metadata } from "next"

// Hide the admin route from search engines and crawlers.
export const metadata: Metadata = {
  title: "Admin — MBSkills",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
