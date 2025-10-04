"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectCard } from "./project-card"
import { useProjects } from "@/hooks/use-projects"

export function ProjectGrid() {
  const [q, setQ] = useState("")
  const [category, setCategory] = useState<string>("all")
  const projects = useProjects()

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQ = q ? (p.name + p.location + p.methodology).toLowerCase().includes(q.toLowerCase()) : true
      const matchesCat = category === "all" ? true : p.category === category
      return matchesQ && matchesCat
    })
  }, [q, category, projects])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3">
        <Input placeholder="Search projects, locations, methods" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-60">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="forestry">Forestry</SelectItem>
            <SelectItem value="renewable">Renewable</SelectItem>
            <SelectItem value="methane">Methane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
