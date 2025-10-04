import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureList() {
  const items = [
    {
      title: "No Double Counting",
      desc: "Credits are unique, traceable tokens. Retirement burns them on-chain.",
    },
    {
      title: "AI + IoT Verification",
      desc: "Real-time sensor data validated by ML triggers automatic issuance.",
    },
    {
      title: "Low-Carbon Blockchain",
      desc: "VeChain’s PoA uses minimal energy and is enterprise-ready.",
    },
    {
      title: "B3TR Rewards",
      desc: "Earn incentives for verifying, generating, and retiring credits.",
    },
  ]
  return (
    <section className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-4">
        {items.map((f, i) => (
          <Card key={i} className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{f.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
