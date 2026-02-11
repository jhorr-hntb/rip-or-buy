import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  sub?: string
  variant?: "default" | "primary" | "accent"
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  variant = "default",
}: StatCardProps) {
  const iconColors = {
    default: "text-muted-foreground",
    primary: "text-primary",
    accent: "text-accent",
  }

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColors[variant]}`} />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-muted-foreground">{sub}</p>
      )}
    </div>
  )
}
