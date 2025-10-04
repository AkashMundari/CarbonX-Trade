"use client"

import { projects as base } from "@/lib/mock-projects"
import { useEffect, useMemo, useState } from "react"

export function useProjects() {
  const [userProjects, setUserProjects] = useState<any[]>([])

  const read = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("userProjects") || "[]")
      setUserProjects(stored)
    } catch {}
  }

  useEffect(() => {
    read()
    const onStorage = (e: StorageEvent) => {
      if (e.key === "userProjects") read()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const all = useMemo(() => [...userProjects, ...base], [userProjects])
  return all
}
