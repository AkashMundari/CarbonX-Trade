// Landing page (RSC)
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MarketplacePreview } from "@/components/marketplace/marketplace-preview";
import { FeatureList } from "@/components/sections/feature-list";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RoleChooser } from "@/components/home/role-chooser";

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 md:px-10 lg:px-16 py-12 md:py-20">
          <div className="max-w-6xl mx-auto grid gap-8 md:gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Decentralized Carbon Credit Marketplace on{" "}
                <span className="text-primary">VeChain</span>
              </h1>
              <p className="text-muted-foreground text-pretty">
                Buy, sell, and retire verifiable carbon credits. AI + IoT
                verification prevents double counting and smart contracts
                automate issuance, trading, and retirement.
              </p>
              <div className="flex gap-3">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:opacity-90"
                >
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#how-it-works">How it works</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground ">
                <span>• Proof-of-Authority </span>
                <span>•Low carbon footprint</span>
                <span>• Real-time monitoring</span>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-4 md:p-6">
              <img
                alt="Marketplace preview"
                className="rounded-lg w-full h-auto"
                src="/vechain-marketplace-preview.jpg"
              />
            </div>
          </div>
        </section>

        {/* Role Chooser */}
        <section className="px-6 md:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <RoleChooser />
          </div>
        </section>

        {/* Features */}
        <FeatureList />

        {/* Marketplace preview */}
        <section
          aria-labelledby="marketplace-preview"
          className="px-6 md:px-10 lg:px-16 py-12 md:py-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                id="marketplace-preview"
                className="text-2xl md:text-3xl font-semibold"
              >
                Featured Projects
              </h2>
              <Button asChild variant="ghost">
                <Link href="/marketplace">View all</Link>
              </Button>
            </div>
            <MarketplacePreview />
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="px-6 md:px-10 lg:px-16 py-14 md:py-20 bg-muted"
        >
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-4">
            {[
              {
                title: "Connect VeWorld",
                desc: "Use your VeChain wallet to sign and transact securely.",
              },
              {
                title: "AI + IoT Verify",
                desc: "Sensor data validated by ML triggers issuance on-chain.",
              },
              {
                title: "Trade Credits",
                desc: "Browse listings, check provenance, and purchase P2P.",
              },
              {
                title: "Retire & Prove",
                desc: "Smart contracts permanently retire credits for proof.",
              },
            ].map((s, i) => (
              <div key={i} className="rounded-lg border bg-card p-5">
                <div className="text-lg font-semibold">{s.title}</div>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
