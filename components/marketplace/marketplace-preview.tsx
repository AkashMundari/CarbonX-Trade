import { projects } from "@/lib/mock-projects"
import { ProjectCard } from "./project-card"

export function MarketplacePreview() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.slice(0, 6).map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
