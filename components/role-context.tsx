"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Role = "buyer" | "seller"
type RoleContextValue = {
  role: Role | null
  setRole: (r: Role) => void
  clearRole: () => void
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(null)

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("role") as Role | null) : null
    if (saved) setRoleState(saved)
  }, [])

  const setRole = (r: Role) => {
    setRoleState(r)
    try {
      localStorage.setItem("role", r)
    } catch {}
  }
  const clearRole = () => {
    setRoleState(null)
    try {
      localStorage.removeItem("role")
    } catch {}
  }

  const value = useMemo(() => ({ role, setRole, clearRole }), [role])
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error("useRole must be used within RoleProvider")
  return ctx
}
