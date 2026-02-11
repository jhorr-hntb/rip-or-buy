import type { BoosterType, Card } from "@/lib/sets-data"
import { boostersNeededForProbability } from "@/lib/probability"
import { Target, Check, ChevronRight } from "lucide-react"

interface ProbabilityMilestonesProps {
  card: Card
  booster: BoosterType
}

const MILESTONES = [
  { target: 0.25, label: "25%" },
  { target: 0.50, label: "50%" },
  { target: 0.75, label: "75%" },
  { target: 0.90, label: "90%" },
  { target: 0.95, label: "95%" },
  { target: 0.99, label: "99%" },
]

export function ProbabilityMilestones({ card, booster }: ProbabilityMilestonesProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Target className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-foreground">
          Probability Milestones
        </h3>
      </div>
      <div className="divide-y divide-border">
        {MILESTONES.map(({ target, label }) => {
          const needed = boostersNeededForProbability(card, booster, target)
          const cost = needed !== null ? needed * booster.price : null
          return (
            <div
              key={target}
              className="flex items-center gap-3 px-4 py-3"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                {target >= 0.9 ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </div>
              <span className="flex-1 text-sm text-foreground">{label} chance</span>
              {needed !== null ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold font-mono text-foreground">
                    {needed.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    boosters
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {'('}~${cost!.toFixed(2)}{')'}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  Not available in this booster
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
