import { SiteHeader } from "@/components/site-header"
import { Calculator } from "@/components/calculator"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Should you rip packs or buy singles?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Select a card you want, choose a booster type, and see the real
            probabilities based on official Wizards of the Coast drop rates.
            Adjust the number of boosters to see how your chances change.
          </p>
        </div>
        <Calculator />
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>
          Drop rates sourced from official Wizards of the Coast collecting articles.
          This tool is not affiliated with or endorsed by Wizards of the Coast.
        </p>
      </footer>
    </div>
  )
}
