"use client"

import { useState, useMemo } from "react"
import { SETS } from "@/lib/sets-data"
import type { Card, BoosterType, SetInfo } from "@/lib/sets-data"
import {
  probabilityPerBooster,
  probabilityAfterN,
  probabilityCurve,
  expectedBoosters,
  expectedCost,
} from "@/lib/probability"
import { ProbabilityChart } from "./probability-chart"
import { ProbabilityMilestones } from "./probability-milestones"
import { StatCard } from "./stat-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Package,
  DollarSign,
  TrendingUp,
  Percent,
  Search,
  Info,
} from "lucide-react"

function formatTreatment(treatment: string): string {
  return treatment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

function formatRarity(rarity: string): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1)
}

function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "mythic":
      return "text-orange-400"
    case "rare":
      return "text-amber-300"
    case "uncommon":
      return "text-zinc-300"
    default:
      return "text-zinc-500"
  }
}

export function Calculator() {
  const [selectedSetCode, setSelectedSetCode] = useState<string>(SETS[0].code)
  const [selectedCardName, setSelectedCardName] = useState<string>("")
  const [selectedBoosterId, setSelectedBoosterId] = useState<string>("")
  const [numBoosters, setNumBoosters] = useState<number>(36)
  const [cardSearch, setCardSearch] = useState<string>("")

  const selectedSet: SetInfo | undefined = useMemo(
    () => SETS.find((s) => s.code === selectedSetCode),
    [selectedSetCode]
  )

  const filteredCards = useMemo(() => {
    if (!selectedSet) return []
    if (!cardSearch.trim()) return selectedSet.cards
    const search = cardSearch.toLowerCase()
    return selectedSet.cards.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.rarity.toLowerCase().includes(search) ||
        c.treatment.toLowerCase().includes(search)
    )
  }, [selectedSet, cardSearch])

  const selectedCard: Card | undefined = useMemo(
    () => selectedSet?.cards.find((c) => c.name === selectedCardName),
    [selectedSet, selectedCardName]
  )

  const selectedBooster: BoosterType | undefined = useMemo(
    () => selectedSet?.boosters.find((b) => b.id === selectedBoosterId),
    [selectedSet, selectedBoosterId]
  )

  // Auto-select first booster when set changes
  const handleSetChange = (code: string) => {
    setSelectedSetCode(code)
    setSelectedCardName("")
    setSelectedBoosterId("")
    setCardSearch("")
  }

  const handleCardSelect = (cardName: string) => {
    setSelectedCardName(cardName)
    // Auto-select first booster if none selected
    if (!selectedBoosterId && selectedSet?.boosters.length) {
      setSelectedBoosterId(selectedSet.boosters[0].id)
    }
  }

  // Calculate probabilities
  const perBoosterProb = useMemo(() => {
    if (!selectedCard || !selectedBooster) return 0
    return probabilityPerBooster(selectedCard, selectedBooster)
  }, [selectedCard, selectedBooster])

  const currentProb = useMemo(() => {
    if (!selectedCard || !selectedBooster) return 0
    return probabilityAfterN(selectedCard, selectedBooster, numBoosters)
  }, [selectedCard, selectedBooster, numBoosters])

  const expectedN = useMemo(() => {
    if (!selectedCard || !selectedBooster) return null
    return expectedBoosters(selectedCard, selectedBooster)
  }, [selectedCard, selectedBooster])

  const expectedTotalCost = useMemo(() => {
    if (!selectedCard || !selectedBooster) return null
    return expectedCost(selectedCard, selectedBooster)
  }, [selectedCard, selectedBooster])

  const chartData = useMemo(() => {
    if (!selectedCard || !selectedBooster) return []
    const maxN = Math.max(numBoosters * 2, 100)
    return probabilityCurve(selectedCard, selectedBooster, maxN)
  }, [selectedCard, selectedBooster, numBoosters])

  const totalCost = numBoosters * (selectedBooster?.price ?? 0)

  const hasResults = selectedCard && selectedBooster && perBoosterProb > 0

  return (
    <div className="flex flex-col gap-8">
      {/* Selection Panel */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-6 text-base font-semibold text-foreground">
          Configure Your Pull
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Set Selector */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Set
            </Label>
            <Select value={selectedSetCode} onValueChange={handleSetChange}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select a set" />
              </SelectTrigger>
              <SelectContent>
                {SETS.map((s) => (
                  <SelectItem key={s.code} value={s.code}>
                    {s.code} - {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Booster Selector */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Booster Type
            </Label>
            <Select
              value={selectedBoosterId}
              onValueChange={setSelectedBoosterId}
              disabled={!selectedSet}
            >
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Select booster type" />
              </SelectTrigger>
              <SelectContent>
                {selectedSet?.boosters.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name} (${b.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Card Search & Select */}
        {selectedSet && (
          <div className="mt-6 flex flex-col gap-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Target Card
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cards by name, rarity, or treatment..."
                value={cardSearch}
                onChange={(e) => setCardSearch(e.target.value)}
                className="bg-secondary border-border pl-9 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-border bg-secondary">
              {filteredCards.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No cards found
                </p>
              ) : (
                filteredCards.map((card) => (
                  <button
                    type="button"
                    key={card.name}
                    onClick={() => handleCardSelect(card.name)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-muted ${
                      selectedCardName === card.name
                        ? "bg-muted border-l-2 border-l-primary"
                        : ""
                    }`}
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">
                        {card.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-medium ${getRarityColor(card.rarity)}`}
                    >
                      {formatRarity(card.rarity)}
                    </span>
                    {card.treatment !== "default" && (
                      <span className="rounded-md bg-card px-2 py-0.5 text-xs text-muted-foreground">
                        {formatTreatment(card.treatment)}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {selectedCard && selectedBooster && (
        <>
          {perBoosterProb <= 0 ? (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-6">
              <Info className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Card not available in this booster type
                </p>
                <p className="text-xs text-muted-foreground">
                  This card cannot be pulled from {selectedBooster.name}s. Try a different booster type.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Booster Slider */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Number of Boosters
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={2000}
                      value={numBoosters}
                      onChange={(e) =>
                        setNumBoosters(
                          Math.max(1, Math.min(2000, Number(e.target.value) || 1))
                        )
                      }
                      className="h-8 w-20 bg-secondary border-border text-center font-mono text-sm text-foreground"
                    />
                  </div>
                </div>
                <Slider
                  value={[numBoosters]}
                  onValueChange={([v]) => setNumBoosters(v)}
                  min={1}
                  max={500}
                  step={1}
                  className="mt-2"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>500</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  icon={Percent}
                  label="Chance with selected"
                  value={`${(currentProb * 100).toFixed(2)}%`}
                  sub={`After ${numBoosters} booster${numBoosters !== 1 ? "s" : ""}`}
                  variant="primary"
                />
                <StatCard
                  icon={Package}
                  label="Expected boosters"
                  value={expectedN !== null ? Math.ceil(expectedN).toLocaleString() : "N/A"}
                  sub="For one copy on average"
                />
                <StatCard
                  icon={DollarSign}
                  label="Expected cost"
                  value={
                    expectedTotalCost !== null
                      ? `$${expectedTotalCost.toFixed(2)}`
                      : "N/A"
                  }
                  sub="At MSRP"
                  variant="accent"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Cost for selected"
                  value={`$${totalCost.toFixed(2)}`}
                  sub={`${numBoosters} x $${selectedBooster.price}`}
                />
              </div>

              {/* Probability per booster detail */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">
                  Each {selectedBooster.name} has a{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {perBoosterProb < 0.0001
                      ? `${(perBoosterProb * 100).toFixed(4)}%`
                      : `${(perBoosterProb * 100).toFixed(2)}%`}
                  </span>{" "}
                  chance of containing{" "}
                  <span className="font-semibold text-foreground">
                    {selectedCard.name}
                  </span>
                  {" "}(1 in{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {Math.round(1 / perBoosterProb).toLocaleString()}
                  </span>
                  )
                </p>
              </div>

              {/* Chart */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground">
                  Probability Curve
                </h3>
                <ProbabilityChart data={chartData} highlightN={numBoosters} />
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Dashed blue line indicates your selected number of boosters ({numBoosters}).
                  Horizontal line marks 50%.
                </p>
              </div>

              {/* Milestones */}
              <ProbabilityMilestones card={selectedCard} booster={selectedBooster} />

              {/* Verdict */}
              <VerdictCard
                currentProb={currentProb}
                numBoosters={numBoosters}
                totalCost={totalCost}
                cardName={selectedCard.name}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

function VerdictCard({
  currentProb,
  numBoosters,
  totalCost,
  cardName,
}: {
  currentProb: number
  numBoosters: number
  totalCost: number
  cardName: string
}) {
  const isGoodOdds = currentProb >= 0.5
  return (
    <div
      className={`rounded-xl border p-6 ${
        isGoodOdds
          ? "border-success/30 bg-success/5"
          : "border-destructive/30 bg-destructive/5"
      }`}
    >
      <h3
        className={`text-lg font-bold ${
          isGoodOdds ? "text-success" : "text-destructive"
        }`}
      >
        {isGoodOdds ? "Decent Odds" : "Risky Pull"}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
        Buying {numBoosters} booster{numBoosters !== 1 ? "s" : ""} for ${totalCost.toFixed(2)} gives
        you a{" "}
        <span className="font-semibold text-foreground">
          {(currentProb * 100).toFixed(1)}%
        </span>{" "}
        chance of pulling {cardName}.{" "}
        {isGoodOdds
          ? "The odds are in your favor, but consider if the single card market price is lower than this expected cost."
          : "You'd more likely miss than hit. Strongly consider buying the single instead."}
      </p>
    </div>
  )
}
