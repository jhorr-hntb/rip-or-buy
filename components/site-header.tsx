import { Layers } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
        <div className="flex items-center justify-center rounded-lg bg-primary p-2">
          <Layers className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Rip or Buy
          </h1>
          <p className="text-xs text-muted-foreground">
            TCG Booster Probability Calculator
          </p>
        </div>
      </div>
    </header>
  )
}
