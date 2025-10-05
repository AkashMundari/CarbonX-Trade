"use client"

// import { projects as base } from "@/lib/mock-projects"
// import { useEffect, useMemo, useState } from "react"
//
// export function useProjects() {
//   const [userProjects, setUserProjects] = useState<any[]>([])
//
//   const read = () => {
//     try {
//       const stored = JSON.parse(localStorage.getItem("userProjects") || "[]")
//       setUserProjects(stored)
//     } catch {}
//   }
//
//   useEffect(() => {
//     read()
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === "userProjects") read()
//     }
//     window.addEventListener("storage", onStorage)
//     return () => window.removeEventListener("storage", onStorage)
//   }, [])
//
//   const all = useMemo(() => [...userProjects, ...base], [userProjects])
//   return all
// }

import { useEffect, useState } from "react"
import { getContract } from "@/lib/contract"
import { ethers } from "ethers";

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const contract = await getContract()
        const data = await contract.getActivities()
        const formatted = data.map((a: any, index: any) => ({
          id: index,
          name: a.name,
          location: a.location,
          category: a.category,
          methodology: a.methodology,
          price: Number(ethers.formatEther(a.price)),
          verified: a.verified,
          available: 1000, // placeholder, since on-chain you don’t store available
          image: "/placeholder.jpg",
        }))
        setProjects(formatted)
      } catch (err) {
        console.error("Error fetching projects:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return projects
}

