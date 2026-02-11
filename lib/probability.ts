// ============================================================
// Probability Engine for "Rip or Buy"
// ============================================================
// Calculates the probability of pulling a specific card from
// a given booster type after opening N boosters.
//
// Core formula:
//   P(at least 1 copy in N boosters) = 1 - (1 - p_per_booster)^N
//
// Where p_per_booster is the sum across all slots of:
//   slotOutcome.probability * (1 / slotOutcome.poolSize)
//
// This assumes each slot is independent and each card in a pool
// is equally likely.
// ============================================================

import type { BoosterType, Card, SlotOutcome } from "./sets-data"

/**
 * Check if a card matches a slot outcome filter
 */
function cardMatchesFilter(card: Card, outcome: SlotOutcome): boolean {
  const { filter } = outcome

  if (filter.set && card.set !== filter.set) return false

  if (filter.rarity) {
    const rarities = Array.isArray(filter.rarity) ? filter.rarity : [filter.rarity]
    if (!rarities.includes(card.rarity)) return false
  }

  if (filter.treatment) {
    const treatments = Array.isArray(filter.treatment) ? filter.treatment : [filter.treatment]
    if (!treatments.includes(card.treatment)) return false
  }

  return true
}

/**
 * Calculate the probability of pulling a specific card from a single booster pack.
 *
 * For each slot, if the card matches any outcome filter, we add:
 *   outcome.probability * (1 / outcome.poolSize)
 *
 * We then combine across slots using:
 *   p_booster = 1 - product_of(1 - p_slot) for each slot
 * which accounts for multiple independent chances per booster.
 */
export function probabilityPerBooster(card: Card, booster: BoosterType): number {
  let probMiss = 1

  for (const slot of booster.slots) {
    let pSlot = 0
    for (const outcome of slot.outcomes) {
      if (cardMatchesFilter(card, outcome)) {
        // Probability this outcome fires * probability it's THIS card in the pool
        pSlot += outcome.probability * (1 / outcome.poolSize)
      }
    }
    probMiss *= 1 - pSlot
  }

  return 1 - probMiss
}

/**
 * Calculate the probability of pulling at least one copy of a card
 * after opening `n` boosters.
 *
 *   P(at least 1 in N) = 1 - (1 - p_per_booster)^N
 */
export function probabilityAfterN(card: Card, booster: BoosterType, n: number): number {
  if (n <= 0) return 0
  const pPer = probabilityPerBooster(card, booster)
  return 1 - (1 - pPer) ** n
}

/**
 * Calculate how many boosters are needed to reach a given target probability.
 *
 *   N = ceil(ln(1 - target) / ln(1 - p_per_booster))
 */
export function boostersNeededForProbability(
  card: Card,
  booster: BoosterType,
  targetProbability: number
): number | null {
  const pPer = probabilityPerBooster(card, booster)
  if (pPer <= 0) return null // Card can't appear in this booster type
  if (pPer >= 1) return 1

  const n = Math.ceil(Math.log(1 - targetProbability) / Math.log(1 - pPer))
  return Math.max(1, n)
}

/**
 * Generate a probability curve: array of { n, probability } tuples
 * from 1 to maxN boosters.
 */
export function probabilityCurve(
  card: Card,
  booster: BoosterType,
  maxN: number
): { n: number; probability: number }[] {
  const pPer = probabilityPerBooster(card, booster)
  const result: { n: number; probability: number }[] = []

  for (let i = 1; i <= maxN; i++) {
    result.push({
      n: i,
      probability: 1 - (1 - pPer) ** i,
    })
  }

  return result
}

/**
 * Expected number of boosters to pull at least one copy.
 *   E[N] = 1 / p_per_booster
 */
export function expectedBoosters(card: Card, booster: BoosterType): number | null {
  const pPer = probabilityPerBooster(card, booster)
  if (pPer <= 0) return null
  return 1 / pPer
}

/**
 * Expected cost to pull at least one copy.
 */
export function expectedCost(card: Card, booster: BoosterType): number | null {
  const e = expectedBoosters(card, booster)
  if (e === null) return null
  return e * booster.price
}
