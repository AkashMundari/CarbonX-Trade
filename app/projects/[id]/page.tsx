// Project detail (RSC)
"use client"

import { notFound } from "next/navigation"
import { projects as base } from "@/lib/mock-projects"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BuyCreditsPanel } from "@/components/projects/buy-credits-panel"

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // merge local projects
  const [userProjects, setUserProjects] = useState<any[]>([])
  useEffect(() => {
    try {
      setUserProjects(JSON.parse(localStorage.getItem("userProjects") || "[]"))
    } catch { }
  }, [])
  const projects = useMemo(() => [...userProjects, ...base], [userProjects])
  const project = projects.find((p) => p.id === params.id)
  if (!project) return notFound()

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1">
        <section className="px-6 md:px-10 lg:px-16 py-10">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
            {/* LEFT COLUMN: image + stacked summary cards */}
            <div className="grid gap-6">
              <img
                src={project.image || "/placeholder.svg?height=480&width=720&query=project%20image"}
                alt={project.name}
                className="rounded-xl border bg-card aspect-[4/3] object-cover"
              />

              {/* Summary cards moved from the previous aside */}
              <div className="space-y-4">
                <div className="rounded-xl border bg-card p-5">
                  <div className="text-sm text-muted-foreground">Total price</div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span>Amount to retire</span>
                    <span>0 tonnes</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>Price per tonne</span>
                    <span>${project.price.toFixed(2)}</span>
                  </div>
                  <div className="my-3 h-px bg-border" />
                  <div className="text-2xl font-semibold">$0.00</div>
                </div>

                <div className="rounded-xl border bg-card p-5">
                  <div className="font-medium">Project Snapshot</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {project.name} · {project.location}
                  </div>
                </div>

                <details className="rounded-xl border bg-card p-5">
                  <summary className="font-medium cursor-pointer">Asset details</summary>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Methodology: {project.methodology}
                    <br />
                    Available: {project.available} tCO₂e
                  </div>
                </details>
              </div>
            </div>

            {/* RIGHT COLUMN: project details + BuyCreditsPanel */}
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold font-display">{project.name}</h1>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <Info label="Location" value={project.location} />
                <Info label="Methodology" value={project.methodology} />
                <Info label="Available" value={`${project.available} tCO₂e`} />
                <Info label="Price" value={`$${project.price}/tCO₂e`} />
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <BuyCreditsPanel project={project} />
                <Button variant="outline">Retire with Proof</Button>
              </div>
              <div className="rounded-lg border bg-muted p-4 text-sm">
                Verified by AI + IoT. On-chain issuance ensures no double counting. VeChain PoA for energy efficiency.
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}
