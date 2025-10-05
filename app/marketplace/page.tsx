// Marketplace (RSC) - simple filters with client component for search
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectGrid } from "@/components/marketplace/project-grid"

export default function MarketplacePage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Marketplace</h1>
          <ProjectGrid />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
