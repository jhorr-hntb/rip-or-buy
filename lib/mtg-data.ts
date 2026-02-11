// ============================================================
// MTG Set Data – TLA & TLE (Avatar: The Last Airbender)
// Source: https://magic.wizards.com/en/news/feature/collecting-avatar-the-last-airbender
// ============================================================

export type Rarity = "common" | "uncommon" | "rare" | "mythic"

export type Treatment =
  | "default"
  | "source-material"
  | "scene"
  | "field-notes"
  | "battle-pose"
  | "elemental-frame"
  | "borderless-saga"
  | "extended-art"
  | "raised-foil"
  | "neon-ink-foil"
  | "appa-land"
  | "avatars-journey-land"

export interface CardEntry {
  name: string
  set: "TLA" | "TLE"
  rarity: Rarity
  treatment: Treatment
  /** Which booster types can this card appear in */
  availableIn: BoosterType[]
}

export type BoosterType = "play" | "collector"

// ============================================================
// Slot probabilities – these capture the official WotC rates
// for each relevant slot in each booster type.
//
// We model the probability of pulling a SPECIFIC card by:
//   P(card) = P(slot_hits_category) / count_of_cards_in_category
//
// A booster has multiple independent slots, so the probability
// of NOT getting the card from a single booster is:
//   P(miss) = product over all slots of (1 - P(card_in_slot))
//
// Over N boosters:
//   P(at_least_one) = 1 - P(miss)^N
// ============================================================

export interface SlotChance {
  /** Human-readable slot description */
  slotName: string
  /** Probability that this slot yields THIS specific category */
  categoryPct: number
  /** Number of distinct cards in this category that share the slot */
  poolSize: number
}

/**
 * For each (rarity + treatment) combination, define which slots in
 * which booster types can produce cards of that type, plus the
 * pool size (how many cards compete for that slot).
 */
export interface PullProfile {
  rarity: Rarity
  treatment: Treatment
  label: string
  boosterSlots: Record<BoosterType, SlotChance[]>
}

// ============================================================
// PULL PROFILES – derived from the official WotC article
// ============================================================

export const pullProfiles: PullProfile[] = [
  // ------- COMMONS (main set, TLA) -------
  {
    rarity: "common",
    treatment: "default",
    label: "Common (Main Set)",
    boosterSlots: {
      play: [
        // 6-7 commons per pack, ~6.5 avg. Pool of 81 commons.
        { slotName: "Common slots (6.5 avg)", categoryPct: 100, poolSize: 81 },
        // Wildcard slot: 4.2% chance of common
        { slotName: "Wildcard (common)", categoryPct: 4.2, poolSize: 81 },
        // Foil slot: 53.9% chance of foil common
        { slotName: "Foil slot (common)", categoryPct: 53.9, poolSize: 81 },
      ],
      collector: [
        // 3 traditional foil commons (pool = 81 commons + 10 dual lands = 91)
        { slotName: "Foil common slots (x3)", categoryPct: 100, poolSize: 91 },
      ],
    },
  },

  // ------- UNCOMMONS (main set, TLA) -------
  {
    rarity: "uncommon",
    treatment: "default",
    label: "Uncommon (Main Set)",
    boosterSlots: {
      play: [
        // 3 uncommon slots, pool of 110
        { slotName: "Uncommon slots (x3)", categoryPct: 100, poolSize: 110 },
        // Wildcard: 74.1% uncommon
        { slotName: "Wildcard (uncommon)", categoryPct: 74.1, poolSize: 110 },
        // Foil slot: 36.7% foil uncommon
        { slotName: "Foil slot (uncommon)", categoryPct: 36.7, poolSize: 110 },
      ],
      collector: [
        // 3 traditional foil uncommons, pool of 110
        { slotName: "Foil uncommon slots (x3)", categoryPct: 100, poolSize: 110 },
      ],
    },
  },

  // ------- RARES (main set, TLA) -------
  {
    rarity: "rare",
    treatment: "default",
    label: "Rare (Main Set)",
    boosterSlots: {
      play: [
        // Rare/mythic slot: 80% rare, pool of 60 rares
        { slotName: "Rare/Mythic slot (rare)", categoryPct: 80, poolSize: 60 },
        // Wildcard: 16.7% rare
        { slotName: "Wildcard (rare)", categoryPct: 16.7, poolSize: 60 },
        // Foil: 6.7% foil rare
        { slotName: "Foil slot (rare)", categoryPct: 6.7, poolSize: 60 },
      ],
      collector: [
        // 1 traditional foil rare/mythic: 85.7% rare out of 60 rares
        { slotName: "Foil R/M slot (rare)", categoryPct: 85.7, poolSize: 60 },
      ],
    },
  },

  // ------- MYTHIC RARES (main set, TLA) -------
  {
    rarity: "mythic",
    treatment: "default",
    label: "Mythic Rare (Main Set)",
    boosterSlots: {
      play: [
        // Rare/mythic slot: 12.6% mythic, pool of 20 mythics
        { slotName: "Rare/Mythic slot (mythic)", categoryPct: 12.6, poolSize: 20 },
        // Wildcard: 2.6% mythic
        { slotName: "Wildcard (mythic)", categoryPct: 2.6, poolSize: 20 },
        // Foil: 1.2% foil mythic
        { slotName: "Foil slot (mythic)", categoryPct: 1.2, poolSize: 20 },
      ],
      collector: [
        // 1 traditional foil rare/mythic: 14.3% mythic out of 20 mythics
        { slotName: "Foil R/M slot (mythic)", categoryPct: 14.3, poolSize: 20 },
      ],
    },
  },

  // ------- SOURCE MATERIAL (61 cards, borderless) -------
  {
    rarity: "rare",
    treatment: "source-material",
    label: "Source Material Card",
    boosterSlots: {
      play: [
        // 1 in 26 play boosters replaces a common
        { slotName: "Common replacement (1/26)", categoryPct: 3.846, poolSize: 61 },
      ],
      collector: [
        // 1 non-foil (75%) or foil (25%) source material per collector booster
        { slotName: "Source material slot", categoryPct: 100, poolSize: 61 },
      ],
    },
  },

  // ------- SCENE CARDS (uncommon, 4 cards) -------
  {
    rarity: "uncommon",
    treatment: "scene",
    label: "Scene Card (Uncommon)",
    boosterSlots: {
      play: [
        // Uncommon slots: 3.6% chance of scene uncommon
        { slotName: "Uncommon slots (scene)", categoryPct: 3.6, poolSize: 4 },
        // Wildcard: <1%
        { slotName: "Wildcard (scene unc)", categoryPct: 0.8, poolSize: 4 },
        // Foil: <1%
        { slotName: "Foil slot (scene unc)", categoryPct: 0.8, poolSize: 4 },
      ],
      collector: [
        // Foil BF uncommon slot: 8% scene
        { slotName: "Foil BF uncommon (scene)", categoryPct: 8, poolSize: 4 },
      ],
    },
  },

  // ------- SCENE CARDS (rare) -------
  {
    rarity: "rare",
    treatment: "scene",
    label: "Scene Card (Rare)",
    boosterSlots: {
      play: [
        // R/M slot: 1.6% rare scene
        { slotName: "R/M slot (scene rare)", categoryPct: 1.6, poolSize: 9 },
        // Wildcard: <1%
        { slotName: "Wildcard (scene rare)", categoryPct: 0.8, poolSize: 9 },
        // Foil: <1%
        { slotName: "Foil (scene rare)", categoryPct: 0.8, poolSize: 9 },
      ],
      collector: [
        // Non-foil BF R/M: 7.8% scene rare
        { slotName: "NF BF R/M (scene rare)", categoryPct: 7.8, poolSize: 9 },
        // Foil BF R/M: 12.8% scene rare
        { slotName: "Foil BF R/M (scene rare)", categoryPct: 12.8, poolSize: 9 },
      ],
    },
  },

  // ------- SCENE CARDS (mythic) -------
  {
    rarity: "mythic",
    treatment: "scene",
    label: "Scene Card (Mythic)",
    boosterSlots: {
      play: [
        // R/M slot: <1% mythic scene
        { slotName: "R/M slot (scene mythic)", categoryPct: 0.5, poolSize: 6 },
        // Wildcard: <1%
        { slotName: "Wildcard (scene mythic)", categoryPct: 0.5, poolSize: 6 },
        // Foil: <1%
        { slotName: "Foil (scene mythic)", categoryPct: 0.5, poolSize: 6 },
      ],
      collector: [
        // Non-foil BF: 1.1% scene mythic
        { slotName: "NF BF R/M (scene mythic)", categoryPct: 1.1, poolSize: 6 },
        // Foil BF: 1.8% scene mythic
        { slotName: "Foil BF R/M (scene mythic)", categoryPct: 1.8, poolSize: 6 },
      ],
    },
  },

  // ------- FIELD NOTES (8 rare, 7 mythic) -------
  {
    rarity: "rare",
    treatment: "field-notes",
    label: "Field Notes (Rare)",
    boosterSlots: {
      play: [
        { slotName: "R/M slot (field notes rare)", categoryPct: 1.4, poolSize: 8 },
        { slotName: "Wildcard (field notes rare)", categoryPct: 0.8, poolSize: 8 },
        { slotName: "Foil (field notes rare)", categoryPct: 0.8, poolSize: 8 },
      ],
      collector: [
        { slotName: "NF BF R/M (field notes rare)", categoryPct: 6.9, poolSize: 8 },
        { slotName: "Foil BF R/M (field notes rare)", categoryPct: 11.4, poolSize: 8 },
      ],
    },
  },
  {
    rarity: "mythic",
    treatment: "field-notes",
    label: "Field Notes (Mythic)",
    boosterSlots: {
      play: [
        { slotName: "R/M slot (field notes mythic)", categoryPct: 0.5, poolSize: 7 },
        { slotName: "Wildcard (field notes mythic)", categoryPct: 0.5, poolSize: 7 },
        { slotName: "Foil (field notes mythic)", categoryPct: 0.5, poolSize: 7 },
      ],
      collector: [
        { slotName: "NF BF R/M (field notes mythic)", categoryPct: 3.0, poolSize: 7 },
        { slotName: "Foil BF R/M (field notes mythic)", categoryPct: 5.0, poolSize: 7 },
      ],
    },
  },

  // ------- BATTLE POSE (5 non-neon, 4 neon ink foil) -------
  {
    rarity: "rare",
    treatment: "battle-pose",
    label: "Battle Pose (Non-Neon)",
    boosterSlots: {
      play: [
        { slotName: "R/M slot (battle pose)", categoryPct: 0.8, poolSize: 5 },
        { slotName: "Wildcard (battle pose)", categoryPct: 0.5, poolSize: 5 },
        { slotName: "Foil (battle pose)", categoryPct: 0.5, poolSize: 5 },
      ],
      collector: [
        { slotName: "NF BF R/M (battle pose)", categoryPct: 1.3, poolSize: 5 },
        { slotName: "Foil BF R/M (battle pose)", categoryPct: 2.1, poolSize: 5 },
      ],
    },
  },
  {
    rarity: "mythic",
    treatment: "neon-ink-foil",
    label: "Battle Pose (Neon Ink Foil)",
    boosterSlots: {
      play: [],
      collector: [
        // Neon ink foil battle pose: <1% in foil BF slot
        { slotName: "Foil BF R/M (neon ink)", categoryPct: 0.8, poolSize: 4 },
      ],
    },
  },

  // ------- ELEMENTAL FRAME (15 rare, 5 mythic) -------
  {
    rarity: "rare",
    treatment: "elemental-frame",
    label: "Elemental Frame (Rare)",
    boosterSlots: {
      play: [
        { slotName: "R/M slot (elemental rare)", categoryPct: 2.4, poolSize: 15 },
        { slotName: "Wildcard (elemental rare)", categoryPct: 0.8, poolSize: 15 },
        { slotName: "Foil (elemental rare)", categoryPct: 0.8, poolSize: 15 },
      ],
      collector: [
        { slotName: "NF BF R/M (elemental rare)", categoryPct: 11.7, poolSize: 15 },
        { slotName: "Foil BF R/M (elemental rare)", categoryPct: 19.2, poolSize: 15 },
      ],
    },
  },
  {
    rarity: "mythic",
    treatment: "elemental-frame",
    label: "Elemental Frame (Mythic)",
    boosterSlots: {
      play: [
        { slotName: "R/M slot (elemental mythic)", categoryPct: 0.5, poolSize: 5 },
        { slotName: "Wildcard (elemental mythic)", categoryPct: 0.5, poolSize: 5 },
        { slotName: "Foil (elemental mythic)", categoryPct: 0.5, poolSize: 5 },
      ],
      collector: [
        { slotName: "NF BF R/M (elemental mythic)", categoryPct: 1.1, poolSize: 5 },
        { slotName: "Foil BF R/M (elemental mythic)", categoryPct: 1.8, poolSize: 5 },
      ],
    },
  },

  // ------- BORDERLESS DOUBLE-FACED SAGAS (5 mythics) -------
  {
    rarity: "mythic",
    treatment: "borderless-saga",
    label: "Borderless Double-Faced Saga",
    boosterSlots: {
      play: [
        { slotName: "R/M slot (saga)", categoryPct: 0.5, poolSize: 5 },
        { slotName: "Wildcard (saga)", categoryPct: 0.5, poolSize: 5 },
        { slotName: "Foil (saga)", categoryPct: 0.5, poolSize: 5 },
      ],
      collector: [
        { slotName: "NF BF R/M (saga)", categoryPct: 2.2, poolSize: 5 },
        { slotName: "Foil BF R/M (saga)", categoryPct: 3.6, poolSize: 5 },
      ],
    },
  },

  // ------- RAISED FOIL AVATAR AANG (1 card, collector only) -------
  {
    rarity: "mythic",
    treatment: "raised-foil",
    label: "Raised Foil Avatar Aang",
    boosterSlots: {
      play: [],
      collector: [
        // <1% of collector boosters – estimated ~0.5%
        { slotName: "Foil BF R/M (raised foil)", categoryPct: 0.5, poolSize: 1 },
      ],
    },
  },

  // ------- EXTENDED-ART (main set in collector) -------
  {
    rarity: "rare",
    treatment: "extended-art",
    label: "Extended-Art (Main Set Rare)",
    boosterSlots: {
      play: [],
      collector: [
        { slotName: "NF BF R/M (ext-art rare)", categoryPct: 24.2, poolSize: 28 },
        { slotName: "Foil BF R/M (ext-art rare)", categoryPct: 39.9, poolSize: 28 },
      ],
    },
  },
  {
    rarity: "mythic",
    treatment: "extended-art",
    label: "Extended-Art (Main Set Mythic)",
    boosterSlots: {
      play: [],
      collector: [
        { slotName: "NF BF R/M (ext-art mythic)", categoryPct: 0.8, poolSize: 1 },
        { slotName: "Foil BF R/M (ext-art mythic)", categoryPct: 0.8, poolSize: 1 },
      ],
    },
  },

  // ------- APPA LANDS -------
  {
    rarity: "common",
    treatment: "appa-land",
    label: "Full-Art Appa Basic Land",
    boosterSlots: {
      play: [
        // 10% non-foil Appa land + 2.5% foil Appa land in land slot
        { slotName: "Land slot (Appa NF)", categoryPct: 10, poolSize: 5 },
        { slotName: "Land slot (Appa foil)", categoryPct: 2.5, poolSize: 5 },
      ],
      collector: [
        // 50% of the foil land slot
        { slotName: "Foil land (Appa)", categoryPct: 50, poolSize: 5 },
      ],
    },
  },

  // ------- AVATAR'S JOURNEY LANDS -------
  {
    rarity: "common",
    treatment: "avatars-journey-land",
    label: "Full-Art Avatar's Journey Basic Land",
    boosterSlots: {
      play: [
        { slotName: "Land slot (Journey NF)", categoryPct: 10, poolSize: 5 },
        { slotName: "Land slot (Journey foil)", categoryPct: 2.5, poolSize: 5 },
      ],
      collector: [
        { slotName: "Foil land (Journey)", categoryPct: 50, poolSize: 5 },
      ],
    },
  },
]

// ============================================================
// Named card catalog for user-friendly selection
// ============================================================

export interface NamedCard {
  id: string
  name: string
  set: "TLA" | "TLE"
  profileLabel: string
  /** Short description of what makes this version special */
  description: string
  /** Rarity badge color hint */
  rarity: Rarity
  treatment: Treatment
  /** MSRP reference for the booster */
  boosterPrices: Record<BoosterType, number>
}

export const boosterPrices: Record<BoosterType, number> = {
  play: 6.99,
  collector: 37.99,
}

export const boosterLabels: Record<BoosterType, string> = {
  play: "Play Booster",
  collector: "Collector Booster",
}

// A curated list of notable cards people actually chase
export const namedCards: NamedCard[] = [
  // RAISED FOIL AANG
  {
    id: "raised-foil-aang",
    name: "Avatar Aang (Raised Foil)",
    set: "TLA",
    profileLabel: "Raised Foil Avatar Aang",
    description: "The headliner card. Borderless raised foil, illustrated by Bryan Konietzko. Collector Boosters only.",
    rarity: "mythic",
    treatment: "raised-foil",
    boosterPrices,
  },
  // NEON INK BATTLE POSE
  {
    id: "neon-ink-fire-lord-zuko",
    name: "Fire Lord Zuko (Neon Ink Battle Pose)",
    set: "TLA",
    profileLabel: "Battle Pose (Neon Ink Foil)",
    description: "Textless neon ink foil borderless battle pose. Collector Boosters only.",
    rarity: "mythic",
    treatment: "neon-ink-foil",
    boosterPrices,
  },
  {
    id: "neon-ink-katara",
    name: "Katara, the Fearless (Neon Ink Battle Pose)",
    set: "TLA",
    profileLabel: "Battle Pose (Neon Ink Foil)",
    description: "Textless neon ink foil borderless battle pose. Collector Boosters only.",
    rarity: "mythic",
    treatment: "neon-ink-foil",
    boosterPrices,
  },
  {
    id: "neon-ink-azula",
    name: "Fire Lord Azula (Neon Ink Battle Pose)",
    set: "TLA",
    profileLabel: "Battle Pose (Neon Ink Foil)",
    description: "Textless neon ink foil borderless battle pose. Collector Boosters only.",
    rarity: "mythic",
    treatment: "neon-ink-foil",
    boosterPrices,
  },
  {
    id: "neon-ink-toph",
    name: "Toph Beifong (Neon Ink Battle Pose)",
    set: "TLA",
    profileLabel: "Battle Pose (Neon Ink Foil)",
    description: "Textless neon ink foil borderless battle pose. Collector Boosters only.",
    rarity: "mythic",
    treatment: "neon-ink-foil",
    boosterPrices,
  },

  // BORDERLESS SAGAS
  {
    id: "saga-kuruk",
    name: "The Legend of Kuruk (Borderless Saga)",
    set: "TLA",
    profileLabel: "Borderless Double-Faced Saga",
    description: "Mythic rare borderless double-faced Saga depicting a former Avatar.",
    rarity: "mythic",
    treatment: "borderless-saga",
    boosterPrices,
  },
  {
    id: "saga-sozin",
    name: "The Rise of Sozin (Borderless Saga)",
    set: "TLA",
    profileLabel: "Borderless Double-Faced Saga",
    description: "Mythic rare borderless double-faced Saga depicting Sozin's rise.",
    rarity: "mythic",
    treatment: "borderless-saga",
    boosterPrices,
  },

  // ELEMENTAL FRAME
  {
    id: "elemental-katara-hope",
    name: "Katara, Water Tribe's Hope (Elemental Frame)",
    set: "TLA",
    profileLabel: "Elemental Frame (Mythic)",
    description: "Mythic rare elemental frame card with water-themed etching.",
    rarity: "mythic",
    treatment: "elemental-frame",
    boosterPrices,
  },
  {
    id: "elemental-redirect",
    name: "Redirect Lightning (Elemental Frame)",
    set: "TLA",
    profileLabel: "Elemental Frame (Rare)",
    description: "Rare elemental frame card with fire-themed etching.",
    rarity: "rare",
    treatment: "elemental-frame",
    boosterPrices,
  },

  // FIELD NOTES
  {
    id: "field-notes-ran-shaw",
    name: "Ran and Shaw (Field Notes)",
    set: "TLA",
    profileLabel: "Field Notes (Mythic)",
    description: "Mythic rare field notes card depicting the firebending masters.",
    rarity: "mythic",
    treatment: "field-notes",
    boosterPrices,
  },
  {
    id: "field-notes-badgermole",
    name: "Badgermole Cub (Field Notes)",
    set: "TLA",
    profileLabel: "Field Notes (Rare)",
    description: "Rare field notes card depicting an adorable Badgermole Cub.",
    rarity: "rare",
    treatment: "field-notes",
    boosterPrices,
  },

  // SOURCE MATERIAL
  {
    id: "source-force-of-negation",
    name: "Force of Negation (Source Material)",
    set: "TLA",
    profileLabel: "Source Material Card",
    description: "Source material card from the original series. 1 in 26 Play Boosters.",
    rarity: "rare",
    treatment: "source-material",
    boosterPrices,
  },
  {
    id: "source-dark-depths",
    name: 'Dark Depths / "The Boy in the Iceberg" (Source Material)',
    set: "TLA",
    profileLabel: "Source Material Card",
    description: "Source material card with alternate name from the original series.",
    rarity: "rare",
    treatment: "source-material",
    boosterPrices,
  },
  {
    id: "source-mystic-remora",
    name: "Mystic Remora (Source Material)",
    set: "TLA",
    profileLabel: "Source Material Card",
    description: "Source material card with shots from the original series.",
    rarity: "rare",
    treatment: "source-material",
    boosterPrices,
  },
  {
    id: "source-eladamris-call",
    name: "Eladamri's Call (Source Material)",
    set: "TLE",
    profileLabel: "Source Material Card",
    description: "Source material card from the eternal-legal set.",
    rarity: "rare",
    treatment: "source-material",
    boosterPrices,
  },

  // SCENE CARDS
  {
    id: "scene-azula-rare",
    name: "Fire Lord Azula (Scene Card)",
    set: "TLA",
    profileLabel: "Scene Card (Rare)",
    description: "Part of the Book 3 scene depicting the series finale.",
    rarity: "rare",
    treatment: "scene",
    boosterPrices,
  },
  {
    id: "scene-zuko-rare",
    name: "Fire Lord Zuko (Scene Card)",
    set: "TLA",
    profileLabel: "Scene Card (Rare)",
    description: "Part of the Book 3 scene depicting the series finale.",
    rarity: "rare",
    treatment: "scene",
    boosterPrices,
  },

  // BATTLE POSE (non-neon)
  {
    id: "battle-pose-azula",
    name: "Fire Lord Azula (Battle Pose)",
    set: "TLA",
    profileLabel: "Battle Pose (Non-Neon)",
    description: "Borderless battle pose card available in Play and Collector Boosters.",
    rarity: "rare",
    treatment: "battle-pose",
    boosterPrices,
  },

  // STANDARD RARES & MYTHICS
  {
    id: "avatar-aang-main",
    name: "Avatar Aang (Main Set)",
    set: "TLA",
    profileLabel: "Mythic Rare (Main Set)",
    description: "The standard mythic rare version of Avatar Aang.",
    rarity: "mythic",
    treatment: "default",
    boosterPrices,
  },
  {
    id: "katara-main",
    name: "Katara, the Fearless (Main Set)",
    set: "TLA",
    profileLabel: "Mythic Rare (Main Set)",
    description: "Standard mythic rare version.",
    rarity: "mythic",
    treatment: "default",
    boosterPrices,
  },
  {
    id: "zuko-main",
    name: "Fire Lord Zuko (Main Set)",
    set: "TLA",
    profileLabel: "Rare (Main Set)",
    description: "Standard rare version from the main set.",
    rarity: "rare",
    treatment: "default",
    boosterPrices,
  },
  {
    id: "azula-main",
    name: "Fire Lord Azula (Main Set)",
    set: "TLA",
    profileLabel: "Mythic Rare (Main Set)",
    description: "Standard mythic rare version from the main set.",
    rarity: "mythic",
    treatment: "default",
    boosterPrices,
  },
  {
    id: "toph-main",
    name: "Toph Beifong (Main Set)",
    set: "TLA",
    profileLabel: "Rare (Main Set)",
    description: "Standard rare version from the main set.",
    rarity: "rare",
    treatment: "default",
    boosterPrices,
  },
  {
    id: "sokka-main",
    name: "Sokka, Boomerang Guy (Main Set)",
    set: "TLA",
    profileLabel: "Rare (Main Set)",
    description: "Standard rare version from the main set.",
    rarity: "rare",
    treatment: "default",
    boosterPrices,
  },
  {
    id: "iroh-main",
    name: "Uncle Iroh (Main Set)",
    set: "TLA",
    profileLabel: "Mythic Rare (Main Set)",
    description: "Standard mythic rare version from the main set.",
    rarity: "mythic",
    treatment: "default",
    boosterPrices,
  },

  // EXTENDED-ART
  {
    id: "extended-art-rare",
    name: "Extended-Art Rare (Collector)",
    set: "TLA",
    profileLabel: "Extended-Art (Main Set Rare)",
    description: "Extended-art version of a main set rare. Collector Boosters only.",
    rarity: "rare",
    treatment: "extended-art",
    boosterPrices,
  },
]

// Group cards by category for the UI
export function getCardsByCategory(): Record<string, NamedCard[]> {
  const categories: Record<string, NamedCard[]> = {}
  for (const card of namedCards) {
    const key = card.profileLabel
    if (!categories[key]) categories[key] = []
    categories[key].push(card)
  }
  return categories
}
