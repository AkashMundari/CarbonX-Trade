export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-primary" aria-hidden />
            <span className="font-semibold">VeCarbon Market</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI + IoT verified carbon credits on VeChain. Transparent, efficient, secure.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Resources</div>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="hover:underline" href="/marketplace">
                Marketplace
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#how-it-works">
                How it works
              </a>
            </li>
            <li>
              <a className="hover:underline" href="https://docs.vechain.org/" target="_blank" rel="noreferrer">
                Docs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Legal</div>
          <p className="text-sm text-muted-foreground">
            Demo UI. Not financial advice. Replace placeholder content with audited contracts and policies.
          </p>
        </div>
      </div>
    </footer>
  )
}
