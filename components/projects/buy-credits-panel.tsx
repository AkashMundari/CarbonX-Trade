"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BuyCreditsPanel({ project }: { project: any }) {
  const [open, setOpen] = useState(false)
  const [tonnes, setTonnes] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")
  const [beneficiary, setBeneficiary] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open && panelRef.current) {
      // Smoothly bring the form into view to avoid “lost focus” feelings on mobile
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [open])

  const total = (Number(tonnes || 0) * Number(project.price || 0)).toFixed(2)

  return (
    <div className="w-full">
      <Button
        onClick={() => setOpen((v) => !v)}
        className="bg-primary text-primary-foreground hover:opacity-90"
        aria-expanded={open}
        aria-controls="buy-credits-panel"
      >
        {open ? "Close purchase form" : "Buy Credits"}
      </Button>

      {open && (
        <div
          ref={panelRef}
          id="buy-credits-panel"
          role="region"
          aria-label="Buy credits form"
          className="mt-6 rounded-xl border bg-card p-5"
        >
          <div className="mb-4 rounded-md bg-muted p-3 text-sm">
            You&apos;re making a positive impact! These credits are independently verified and can be retired
            permanently.
          </div>

          <fieldset className="grid gap-4">
            <legend className="sr-only">Retirement details</legend>

            <div>
              <label className="text-sm font-medium" htmlFor="tonnes">
                How many tonnes of carbon would you like to retire? *
              </label>
              <Input
                id="tonnes"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="Tonnes"
                value={tonnes}
                onChange={(e) => setTonnes(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">Available: {project.available} tCO₂e</p>
            </div>

            <div>
              <label className="text-sm font-medium">In what country will this certificate be consumed? *</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {["United States", "India", "Brazil", "Kenya", "Vietnam", "Germany"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Consumption Period – Start *</label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">End *</label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-2" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Who will this retirement be credited to? *</label>
              <Input
                placeholder="Beneficiary name"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Public message</label>
              <Textarea
                rows={4}
                placeholder="Add a message explaining the reason for this retirement."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                This message is public. Don’t include personal information.
              </p>
            </div>

            <details className="rounded-md border bg-muted/50 p-3">
              <summary className="cursor-pointer font-medium">Payment & Privacy Info</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Your wallet address will be used to settle on-chain. Personal data is minimized and never sold.
              </p>
            </details>

            <details className="rounded-md border bg-muted/50 p-3">
              <summary className="cursor-pointer font-medium">What happens after I click BUY?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We’ll prepare the transaction, request your signature, and provide on-chain proof of retirement.
              </p>
            </details>

            <div className="flex items-center justify-between rounded-md border bg-card p-3">
              <div aria-live="polite">
                <div className="text-xs text-muted-foreground">Total cost</div>
                <div className="text-2xl font-semibold">${total}</div>
              </div>
              <Button className="bg-accent text-accent-foreground hover:opacity-90">Login or Sign Up to Buy</Button>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  )
}
