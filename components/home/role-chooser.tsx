"use client"

import { useRole } from "@/components/role-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function RoleChooser() {
  const { role, setRole } = useRole()
  const router = useRouter()

  const choose = (r: "buyer" | "seller") => {
    if (r === "buyer") {
      setRole(r)
      router.push("/marketplace")
      return
    }
    // For sellers, collect details first
    router.push("/sell/onboarding")
  }

  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-xl font-semibold font-display">I am a Buyer</h3>
        <p className="mt-2 text-muted-foreground">
          Browse verified projects and purchase carbon credits with on-chain proof.
        </p>
        <Button onClick={() => choose("buyer")} className="mt-4 bg-accent text-accent-foreground hover:opacity-90">
          Continue as Buyer
        </Button>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-xl font-semibold font-display">I am a Seller</h3>
        <p className="mt-2 text-muted-foreground">
          List your carbon offset project and reach enterprise buyers globally.
        </p>
        <Button onClick={() => choose("seller")} className="mt-4 bg-primary text-primary-foreground hover:opacity-90">
          Continue as Seller
        </Button>
      </div>
    </div>
  )
}
