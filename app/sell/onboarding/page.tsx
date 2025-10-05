"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRole } from "@/components/role-context"
import { registerSeller } from "@/lib/contract"   // <-- import here

export default function SellerOnboardingPage() {
  const router = useRouter()
  const { setRole } = useRole()
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [about, setAbout] = useState("")
  const [docs, setDocs] = useState<{ name: string; dataUrl: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleDocs = async (files: FileList | null) => {
    if (!files) return
    const next: { name: string; dataUrl: string }[] = []
    for (const file of Array.from(files)) {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => resolve(String(fr.result))
        fr.onerror = () => reject(fr.error)
        fr.readAsDataURL(file)
      })
      next.push({ name: file.name, dataUrl })
    }
    setDocs((prev) => [...prev, ...next])
  }

  const submit = async () => {
    setLoading(true)
    setError("")
    try {
      // 🔹 Blockchain registration
      const tx = await registerSeller(name)
      console.log("Transaction complete:", tx)

      // 🔹 Local data storage (optional)
      localStorage.setItem("sellerProfile", JSON.stringify({ name, company, about, docs }))
      localStorage.setItem("role", "seller")
      if (setRole) setRole("seller")

      alert("Successfully registered on blockchain ✅")
      router.push("/sell/list-project")
    } catch (e: any) {
      console.error(e)
      setError(e.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold font-display">Seller Onboarding</h1>
          <p className="text-muted-foreground mt-2">
            Tell us about you and your company. Documents are stored in your browser for this demo.
          </p>

          <div className="mt-6 grid gap-4">
            <Input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input required placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
            <Textarea
              rows={4}
              placeholder="About your organization (optional)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <div className="grid gap-2">
              <label className="text-sm font-medium">Documents (PDF, images)</label>
              <Input type="file" accept=".pdf,image/*" multiple onChange={(e) => handleDocs(e.target.files)} />
              {docs.length > 0 && (
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  {docs.map((d, i) => (
                    <li key={i}>{d.name}</li>
                  ))}
                </ul>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={submit}
                disabled={loading || !name}
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                {loading ? "Registering..." : "Continue to List Project"}
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
