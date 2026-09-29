// ============================================================
// MTG Set Data & Drop-Rate Matrix
// ============================================================
// Sources:
//   https://magic.wizards.com/en/news/feature/collecting-avatar-the-last-airbender
// ============================================================

// ---- Types ----

export type Rarity = "common" | "uncommon" | "rare" | "mythic"

export type BoosterFunTreatment =
  | "default"
  | "source-material"
  | "scene"
  | "field-notes"
  | "battle-pose"
  | "elemental-frame"
  | "borderless-saga"
  | "extended-art"
  | "neon-ink"
  | "raised-foil"
  | "appa-land"
  | "avatars-journey-land"

export interface Card {
  name: string
  set: string
  rarity: Rarity
  treatment: BoosterFunTreatment | string
  /** Card number within the set (for display) */
  number?: string
}

export interface BoosterSlot {
  /** Human-readable name of this slot */
  label: string
  /** Number of cards drawn from this slot in one booster */
  quantity?: number
  /** Array of possible outcomes.  probability = chance this outcome fills the slot (0–1) */
  outcomes: SlotOutcome[]
}

export interface SlotOutcome {
  /** Probability of this specific outcome happening (0 to 1) */
  probability: number
  /** How many cards in the pool for this outcome */
  poolSize: number
  /** Filter describing what cards are eligible */
  filter: {
    set?: string
    rarity?: Rarity | Rarity[]
    treatment?: string | string[]
  }
  label: string
}

export interface BoosterType {
  id: string
  name: string
  setCode: string
  slots: BoosterSlot[]
}

export interface SetInfo {
  code: string
  name: string
  releaseDate: string
  boosters: BoosterType[]
  cards: Card[]
  oddsSourceUrl?: string
  oddsNotes?: string
}

// ============================================================
// TLA / TLE Card Lists (representative selection per rarity)
// ============================================================
// Full card lists would be massive; here we include enough
// representative cards so users can explore the probability math.
// The pool sizes in the booster slot definitions are what matter
// for the probability engine.
// ============================================================

const TLA_CARDS: Card[] = [
  // --- Mythic Rares (20 in main set) ---
  { name: "Avatar Aang", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Avatar Aang (Raised Foil)", set: "TLA", rarity: "mythic", treatment: "raised-foil" },
  { name: "Fire Lord Ozai", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Fire Lord Azula", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Fire Lord Azula (Scene)", set: "TLA", rarity: "mythic", treatment: "scene" },
  { name: "Katara, Water Tribe's Hope", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Katara, Water Tribe's Hope (Elemental Frame)", set: "TLA", rarity: "mythic", treatment: "elemental-frame" },
  { name: "Fire Lord Zuko", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Fire Lord Zuko (Battle Pose)", set: "TLA", rarity: "mythic", treatment: "battle-pose" },
  { name: "Fire Lord Zuko (Scene)", set: "TLA", rarity: "mythic", treatment: "scene" },
  { name: "Toph Beifong", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Uncle Iroh", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Sokka, Boomerang Guy", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "Aang, Master of Elements", set: "TLA", rarity: "mythic", treatment: "default" },
  { name: "The Legend of Kuruk (Saga)", set: "TLA", rarity: "mythic", treatment: "borderless-saga" },
  { name: "The Rise of Sozin (Saga)", set: "TLA", rarity: "mythic", treatment: "borderless-saga" },
  { name: "The Fall of Roku (Saga)", set: "TLA", rarity: "mythic", treatment: "borderless-saga" },
  { name: "The Tale of Yangchen (Saga)", set: "TLA", rarity: "mythic", treatment: "borderless-saga" },
  { name: "The Reign of Kyoshi (Saga)", set: "TLA", rarity: "mythic", treatment: "borderless-saga" },
  { name: "Ran and Shaw (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },
  { name: "Badgermole Cub (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },
  { name: "Appa, Sky Bison (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },
  { name: "Momo, Friendly Flier (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },
  { name: "Turtle Duck (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },
  { name: "Fire Ferret (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },
  { name: "Naga (Field Notes)", set: "TLA", rarity: "mythic", treatment: "field-notes" },

  // --- Rares (60 in main set) ---
  { name: "Katara, the Fearless", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Sokka's Sword", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Azula's Lightning", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Redirect Lightning (Elemental Frame)", set: "TLA", rarity: "rare", treatment: "elemental-frame" },
  { name: "Cabbage Merchant", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Ty Lee", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Mai", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Princess Yue", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Jet", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Admiral Zhao", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Bumi, King of Omashu", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Suki", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "The Boulder", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Hama", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Guru Pathik", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Combustion Man", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Piandao", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Long Feng", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Hakoda", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "The Painted Lady", set: "TLA", rarity: "rare", treatment: "default" },
  { name: "Fire Lord Azula (Battle Pose)", set: "TLA", rarity: "rare", treatment: "battle-pose" },

  // --- Uncommons (110 in main set) ---
  { name: "Firebending Student", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Waterbending Student", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Earthbending Student", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Airbending Student", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Kyoshi Warrior", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Fire Nation Soldier", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Dai Li Agent", set: "TLA", rarity: "uncommon", treatment: "default" },
  { name: "Katara's Reversal (Scene)", set: "TLA", rarity: "uncommon", treatment: "scene" },
  { name: "Sokka and Suki (Scene)", set: "TLA", rarity: "uncommon", treatment: "scene" },

  // --- Commons (81 in main set) ---
  { name: "Cactus Juice", set: "TLA", rarity: "common", treatment: "default" },
  { name: "Pai Sho Tile", set: "TLA", rarity: "common", treatment: "default" },
  { name: "Ember Island Player", set: "TLA", rarity: "common", treatment: "default" },
  { name: "Cave of Two Lovers", set: "TLA", rarity: "common", treatment: "default" },
  { name: "Jasmine Dragon Tea", set: "TLA", rarity: "common", treatment: "default" },

  // --- Source Material Cards (61 total) ---
  { name: "Force of Negation (Source Material)", set: "TLA", rarity: "rare", treatment: "source-material" },
  { name: "Eladamri's Call (Source Material)", set: "TLA", rarity: "rare", treatment: "source-material" },
  { name: "Mystic Remora (Source Material)", set: "TLA", rarity: "rare", treatment: "source-material" },
  { name: "Dark Depths (Source Material)", set: "TLA", rarity: "rare", treatment: "source-material" },
]

const TLE_CARDS: Card[] = [
  // --- TLE Mythic Rares (11 from Jumpstart) ---
  { name: "Korra, Avatar Reborn", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Asami Sato", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Lin Beifong", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Tenzin", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Amon", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Unalaq", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Zaheer", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Kuvira", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Bolin", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Mako", set: "TLE", rarity: "mythic", treatment: "default" },
  { name: "Varrick", set: "TLE", rarity: "mythic", treatment: "default" },

  // --- TLE Rares (32 from Jumpstart, 10 from Beginner Box, 28 extended-art) ---
  { name: "Pabu", set: "TLE", rarity: "rare", treatment: "default" },
  { name: "Naga", set: "TLE", rarity: "rare", treatment: "default" },
  { name: "Oogi", set: "TLE", rarity: "rare", treatment: "default" },
  { name: "Republic City", set: "TLE", rarity: "rare", treatment: "default" },
  { name: "Pro-bending Arena", set: "TLE", rarity: "rare", treatment: "default" },
  { name: "Spirit Portal", set: "TLE", rarity: "rare", treatment: "default" },

  // --- TLE Commons (22 Jumpstart + 31 Beginner Box = 53) ---
  { name: "Equalist Chi-Blocker", set: "TLE", rarity: "common", treatment: "default" },
  { name: "Future Industries Mech", set: "TLE", rarity: "common", treatment: "default" },
  { name: "Spirit Vine", set: "TLE", rarity: "common", treatment: "default" },

  // --- TLE Uncommons (32 Jumpstart + 14 Beginner Box = 46) ---
  { name: "Platinum Mech Suit", set: "TLE", rarity: "uncommon", treatment: "default" },
  { name: "Triple Threat Triad", set: "TLE", rarity: "uncommon", treatment: "default" },
]

// ============================================================
// Booster Definitions (with official drop rates)
// ============================================================

const TLA_PLAY_BOOSTER: BoosterType = {
  id: "tla-play",
  name: "Play Booster",
  setCode: "TLA",
  slots: [
    // Six main-set commons plus a seventh-card replacement slot.
    {
      label: "Commons (x6)",
      quantity: 6,
      outcomes: [
        { probability: 1, poolSize: 81, filter: { set: "TLA", rarity: "common", treatment: "default" }, label: "Common" },
      ],
    },
    {
      label: "Seventh common or Source Material",
      outcomes: [
        { probability: 25 / 26, poolSize: 81, filter: { set: "TLA", rarity: "common", treatment: "default" }, label: "Common" },
        { probability: 1 / 26, poolSize: 61, filter: { set: "TLA", treatment: "source-material" }, label: "Source Material" },
      ],
    },
    // Slots 7-9: Uncommons
    {
      label: "Uncommons (x3)",
      quantity: 3,
      outcomes: [
        { probability: 0.964, poolSize: 110, filter: { set: "TLA", rarity: "uncommon", treatment: "default" }, label: "Uncommon" },
        { probability: 0.036, poolSize: 4, filter: { set: "TLA", rarity: "uncommon", treatment: "scene" }, label: "Uncommon Scene Card" },
      ],
    },
    // Slot 10: Wildcard (any rarity)
    {
      label: "Wildcard slot",
      outcomes: [
        { probability: 0.042, poolSize: 81, filter: { set: "TLA", rarity: "common" }, label: "Common" },
        { probability: 0.741, poolSize: 110, filter: { set: "TLA", rarity: "uncommon" }, label: "Uncommon" },
        { probability: 0.167, poolSize: 60, filter: { set: "TLA", rarity: "rare" }, label: "Rare" },
        { probability: 0.026, poolSize: 20, filter: { set: "TLA", rarity: "mythic" }, label: "Mythic Rare" },
        { probability: 0.005, poolSize: 4, filter: { set: "TLA", rarity: "uncommon", treatment: "scene" }, label: "Uncommon Scene" },
        { probability: 0.005, poolSize: 8, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "scene" }, label: "Rare/Mythic Scene" },
        { probability: 0.005, poolSize: 15, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "field-notes" }, label: "Rare/Mythic Field Notes" },
        { probability: 0.004, poolSize: 5, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "battle-pose" }, label: "Rare/Mythic Battle Pose" },
        { probability: 0.004, poolSize: 20, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "elemental-frame" }, label: "Rare/Mythic Elemental Frame" },
        { probability: 0.002, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "borderless-saga" }, label: "Mythic Borderless Saga" },
      ],
    },
    // Slot 11: Rare/Mythic Rare
    {
      label: "Rare / Mythic Rare slot",
      outcomes: [
        { probability: 0.800, poolSize: 60, filter: { set: "TLA", rarity: "rare", treatment: "default" }, label: "Rare" },
        { probability: 0.126, poolSize: 20, filter: { set: "TLA", rarity: "mythic", treatment: "default" }, label: "Mythic Rare" },
        { probability: 0.016, poolSize: 4, filter: { set: "TLA", rarity: "rare", treatment: "scene" }, label: "Rare Scene" },
        { probability: 0.005, poolSize: 4, filter: { set: "TLA", rarity: "mythic", treatment: "scene" }, label: "Mythic Scene" },
        { probability: 0.014, poolSize: 8, filter: { set: "TLA", rarity: "rare", treatment: "field-notes" }, label: "Rare Field Notes" },
        { probability: 0.005, poolSize: 7, filter: { set: "TLA", rarity: "mythic", treatment: "field-notes" }, label: "Mythic Field Notes" },
        { probability: 0.004, poolSize: 5, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "battle-pose" }, label: "Rare/Mythic Battle Pose" },
        { probability: 0.024, poolSize: 15, filter: { set: "TLA", rarity: "rare", treatment: "elemental-frame" }, label: "Rare Elemental Frame" },
        { probability: 0.004, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "elemental-frame" }, label: "Mythic Elemental Frame" },
        { probability: 0.002, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "borderless-saga" }, label: "Mythic Borderless Saga" },
      ],
    },
    // Slot 12: Traditional foil (any rarity)
    {
      label: "Traditional Foil slot",
      outcomes: [
        { probability: 0.539, poolSize: 81, filter: { set: "TLA", rarity: "common" }, label: "Foil Common" },
        { probability: 0.367, poolSize: 110, filter: { set: "TLA", rarity: "uncommon" }, label: "Foil Uncommon" },
        { probability: 0.067, poolSize: 60, filter: { set: "TLA", rarity: "rare" }, label: "Foil Rare" },
        { probability: 0.012, poolSize: 20, filter: { set: "TLA", rarity: "mythic" }, label: "Foil Mythic Rare" },
        { probability: 0.005, poolSize: 4, filter: { set: "TLA", rarity: "uncommon", treatment: "scene" }, label: "Foil Uncommon Scene" },
        { probability: 0.003, poolSize: 8, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "scene" }, label: "Foil Rare/Mythic Scene" },
        { probability: 0.003, poolSize: 15, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "field-notes" }, label: "Foil Rare/Mythic Field Notes" },
        { probability: 0.002, poolSize: 5, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "battle-pose" }, label: "Foil Rare/Mythic Battle Pose" },
        { probability: 0.002, poolSize: 20, filter: { set: "TLA", rarity: ["rare", "mythic"], treatment: "elemental-frame" }, label: "Foil Rare/Mythic Elemental Frame" },
        { probability: 0.001, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "borderless-saga" }, label: "Foil Mythic Borderless Saga" },
      ],
    },
  ],
}

const TLA_COLLECTOR_BOOSTER: BoosterType = {
  id: "tla-collector",
  name: "Collector Booster",
  setCode: "TLA",
  slots: [
    // Slot 1-3: Traditional foil commons
    {
      label: "Foil Common (x3)",
      quantity: 3,
      outcomes: [
        { probability: 1.0, poolSize: 91, filter: { set: "TLA", rarity: "common" }, label: "Foil Common (81 main + 10 dual)" },
      ],
    },
    // Slot 4-6: Traditional foil uncommons
    {
      label: "Foil Uncommon (x3)",
      quantity: 3,
      outcomes: [
        { probability: 1.0, poolSize: 110, filter: { set: "TLA", rarity: "uncommon" }, label: "Foil Uncommon" },
      ],
    },
    // Slot 7-8: Traditional foil TLE commons
    {
      label: "Foil TLE Common (x2)",
      quantity: 2,
      outcomes: [
        { probability: 1.0, poolSize: 53, filter: { set: "TLE", rarity: "common" }, label: "Foil TLE Common" },
      ],
    },
    // Slot 9: Traditional foil TLE or Booster Fun uncommon
    {
      label: "Foil TLE/BF Uncommon",
      outcomes: [
        { probability: 0.08, poolSize: 4, filter: { set: "TLA", rarity: "uncommon", treatment: "scene" }, label: "Uncommon Scene Card" },
        { probability: 0.92, poolSize: 46, filter: { set: "TLE", rarity: "uncommon" }, label: "TLE Uncommon" },
      ],
    },
    // Slot 10: Foil Appa or Avatar's Journey land
    {
      label: "Foil Full-Art Land",
      outcomes: [
        { probability: 0.50, poolSize: 5, filter: { set: "TLA", treatment: "appa-land" }, label: "Foil Appa Land" },
        { probability: 0.50, poolSize: 5, filter: { set: "TLA", treatment: "avatars-journey-land" }, label: "Foil Avatar's Journey Land" },
      ],
    },
    // Slot 11: Traditional foil rare or mythic rare (main set)
    {
      label: "Foil Rare/Mythic (Main Set)",
      outcomes: [
        { probability: 0.857, poolSize: 60, filter: { set: "TLA", rarity: "rare" }, label: "Foil Rare" },
        { probability: 0.143, poolSize: 20, filter: { set: "TLA", rarity: "mythic" }, label: "Foil Mythic Rare" },
      ],
    },
    // Slot 12: Traditional foil TLE rare or mythic
    {
      label: "Foil TLE Rare/Mythic",
      outcomes: [
        { probability: 0.37, poolSize: 32, filter: { set: "TLE", rarity: "rare" }, label: "TLE Rare (Jumpstart)" },
        { probability: 0.064, poolSize: 11, filter: { set: "TLE", rarity: "mythic" }, label: "TLE Mythic (Jumpstart)" },
        { probability: 0.115, poolSize: 10, filter: { set: "TLE", rarity: "rare" }, label: "TLE Rare (Beginner Box)" },
        { probability: 0.324, poolSize: 28, filter: { set: "TLE", rarity: "rare", treatment: "extended-art" }, label: "TLE Extended-Art Rare" },
        { probability: 0.127, poolSize: 11, filter: { set: "TLE", rarity: "mythic", treatment: "extended-art" }, label: "TLE Extended-Art Mythic" },
      ],
    },
    // Slot 13: Non-foil Booster Fun rare or mythic
    {
      label: "Non-Foil Booster Fun R/M",
      outcomes: [
        { probability: 0.078, poolSize: 4, filter: { set: "TLA", rarity: "rare", treatment: "scene" }, label: "Rare Scene" },
        { probability: 0.011, poolSize: 4, filter: { set: "TLA", rarity: "mythic", treatment: "scene" }, label: "Mythic Scene" },
        { probability: 0.069, poolSize: 8, filter: { set: "TLA", rarity: "rare", treatment: "field-notes" }, label: "Rare Field Notes" },
        { probability: 0.030, poolSize: 7, filter: { set: "TLA", rarity: "mythic", treatment: "field-notes" }, label: "Mythic Field Notes" },
        { probability: 0.013, poolSize: 1, filter: { set: "TLA", rarity: "rare", treatment: "battle-pose" }, label: "Rare Battle Pose" },
        { probability: 0.005, poolSize: 4, filter: { set: "TLA", rarity: "mythic", treatment: "battle-pose" }, label: "Mythic Battle Pose" },
        { probability: 0.117, poolSize: 15, filter: { set: "TLA", rarity: "rare", treatment: "elemental-frame" }, label: "Rare Elemental Frame" },
        { probability: 0.011, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "elemental-frame" }, label: "Mythic Elemental Frame" },
        { probability: 0.022, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "borderless-saga" }, label: "Mythic Borderless Saga" },
        { probability: 0.242, poolSize: 28, filter: { set: "TLA", rarity: "rare", treatment: "extended-art" }, label: "Extended-Art Rare (Main)" },
        { probability: 0.005, poolSize: 1, filter: { set: "TLA", rarity: "mythic", treatment: "extended-art" }, label: "Extended-Art Mythic (Main)" },
        { probability: 0.242, poolSize: 28, filter: { set: "TLE", rarity: "rare", treatment: "extended-art" }, label: "Extended-Art Rare (TLE)" },
        { probability: 0.048, poolSize: 11, filter: { set: "TLE", rarity: "mythic", treatment: "extended-art" }, label: "Extended-Art Mythic (TLE)" },
        { probability: 0.104, poolSize: 6, filter: { set: "TLA", rarity: "rare", treatment: "scene" }, label: "Scene Box Rare" },
      ],
    },
    // Slot 14: Source Material
    {
      label: "Source Material Card",
      outcomes: [
        { probability: 0.75, poolSize: 61, filter: { set: "TLA", treatment: "source-material" }, label: "Non-Foil Source Material" },
        { probability: 0.25, poolSize: 61, filter: { set: "TLA", treatment: "source-material" }, label: "Foil Source Material" },
      ],
    },
    // Slot 15: Foil Booster Fun rare or mythic
    {
      label: "Foil Booster Fun R/M",
      outcomes: [
        { probability: 0.128, poolSize: 4, filter: { set: "TLA", rarity: "rare", treatment: "scene" }, label: "Foil Rare Scene" },
        { probability: 0.018, poolSize: 4, filter: { set: "TLA", rarity: "mythic", treatment: "scene" }, label: "Foil Mythic Scene" },
        { probability: 0.114, poolSize: 8, filter: { set: "TLA", rarity: "rare", treatment: "field-notes" }, label: "Foil Rare Field Notes" },
        { probability: 0.050, poolSize: 7, filter: { set: "TLA", rarity: "mythic", treatment: "field-notes" }, label: "Foil Mythic Field Notes" },
        { probability: 0.021, poolSize: 1, filter: { set: "TLA", rarity: "rare", treatment: "battle-pose" }, label: "Foil Rare Battle Pose" },
        { probability: 0.014, poolSize: 4, filter: { set: "TLA", rarity: "mythic", treatment: "battle-pose" }, label: "Foil Mythic Battle Pose" },
        { probability: 0.005, poolSize: 4, filter: { set: "TLA", rarity: "mythic", treatment: "neon-ink" }, label: "Neon Ink Battle Pose" },
        { probability: 0.192, poolSize: 15, filter: { set: "TLA", rarity: "rare", treatment: "elemental-frame" }, label: "Foil Rare Elemental Frame" },
        { probability: 0.018, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "elemental-frame" }, label: "Foil Mythic Elemental Frame" },
        { probability: 0.036, poolSize: 5, filter: { set: "TLA", rarity: "mythic", treatment: "borderless-saga" }, label: "Foil Mythic Borderless Saga" },
        { probability: 0.399, poolSize: 28, filter: { set: "TLA", rarity: "rare", treatment: "extended-art" }, label: "Foil Extended-Art Rare (Main)" },
        { probability: 0.005, poolSize: 1, filter: { set: "TLA", rarity: "mythic", treatment: "extended-art" }, label: "Foil Extended-Art Mythic (Main)" },
        { probability: 0.005, poolSize: 1, filter: { set: "TLA", rarity: "mythic", treatment: "raised-foil" }, label: "Raised Foil Avatar Aang" },
      ],
    },
  ],
}

type RarityOdds = Partial<Record<Rarity, number>>

function makeRarityOutcomes(
  setCode: string,
  poolSizes: Record<Rarity, number>,
  odds: RarityOdds
): SlotOutcome[] {
  return (Object.entries(odds) as [Rarity, number][])
    .filter(([, probability]) => probability > 0)
    .map(([rarity, probability]) => ({
      probability,
      poolSize: poolSizes[rarity],
      filter: { set: setCode, rarity, treatment: "default" },
      label: `Default-frame ${rarity}`,
    }))
}

function makePlayBooster(
  setCode: string,
  poolSizes: Record<Rarity, number>,
  extraCommonProbability: number,
  wildcardOdds: RarityOdds,
  rareSlotOdds: RarityOdds,
  foilOdds: RarityOdds,
  uncommonCount = 3,
  additionalSlots: BoosterSlot[] = []
): BoosterType {
  return {
    id: `${setCode.toLowerCase()}-play`,
    name: "Play Booster",
    setCode,
    slots: [
      {
        label: "Commons (x6)",
        quantity: 6,
        outcomes: makeRarityOutcomes(setCode, poolSizes, { common: 1 }),
      },
      {
        label: "Additional common",
        outcomes: makeRarityOutcomes(setCode, poolSizes, { common: extraCommonProbability }),
      },
      {
        label: `Uncommons (x${uncommonCount})`,
        quantity: uncommonCount,
        outcomes: makeRarityOutcomes(setCode, poolSizes, { uncommon: 1 }),
      },
      ...additionalSlots,
      {
        label: "Wildcard",
        outcomes: makeRarityOutcomes(setCode, poolSizes, wildcardOdds),
      },
      {
        label: "Rare or mythic slot",
        outcomes: makeRarityOutcomes(setCode, poolSizes, rareSlotOdds),
      },
      {
        label: "Traditional foil",
        outcomes: makeRarityOutcomes(setCode, poolSizes, foilOdds),
      },
    ],
  }
}

function makeCollectorBooster(
  setCode: string,
  poolSizes: Record<Rarity, number>,
  commonCount: number,
  commonPoolSize: number,
  commonDefaultProbability: number,
  uncommonCount: number,
  uncommonDefaultProbability: number,
  rareMythicOdds: RarityOdds,
  uncommonPoolSize = poolSizes.uncommon,
  rareMythicCount = 1
): BoosterType {
  return {
    id: `${setCode.toLowerCase()}-collector`,
    name: "Collector Booster",
    setCode,
    slots: [
      {
        label: "Foil commons",
        quantity: commonCount,
        outcomes: [{
          probability: commonDefaultProbability,
          poolSize: commonPoolSize,
          filter: { set: setCode, rarity: "common", treatment: "default" },
          label: "Default-frame common",
        }],
      },
      {
        label: "Foil uncommons",
        quantity: uncommonCount,
        outcomes: [{
          probability: uncommonDefaultProbability,
          poolSize: uncommonPoolSize,
          filter: { set: setCode, rarity: "uncommon", treatment: "default" },
          label: "Default-frame uncommon",
        }],
      },
      {
        label: "Foil rare or mythic",
        quantity: rareMythicCount,
        outcomes: makeRarityOutcomes(setCode, poolSizes, rareMythicOdds),
      },
    ],
  }
}

const RECENT_PLAY_SETS: SetInfo[] = [
  {
    code: "LCI",
    name: "The Lost Caverns of Ixalan",
    releaseDate: "2023-11-17",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-the-lost-caverns-of-ixalan",
    oddsNotes: "Collector Booster only. Main-set default-frame common, uncommon, and rare/mythic slots are modeled; Jurassic World and Booster Fun cards are excluded.",
    boosters: [
      makeCollectorBooster(
        "LCI",
        { common: 108, uncommon: 92, rare: 64, mythic: 22 },
        4,
        108,
        1,
        3,
        1,
        { rare: 0.853, mythic: 0.147 }
      ),
    ],
    cards: [],
  },
  {
    code: "MKM",
    name: "Murders at Karlov Manor",
    releaseDate: "2024-02-09",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-murders-at-karlov-manor",
    oddsNotes: "Collector Booster only. The Play Booster wildcard and foil rarity breakdowns are not itemized enough for named-card odds.",
    boosters: [
      makeCollectorBooster(
        "MKM",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        4,
        81,
        81 / 91,
        3,
        1,
        { rare: 0.75, mythic: 0.125 }
      ),
    ],
    cards: [],
  },
  {
    code: "BLB",
    name: "Bloomburrow",
    releaseDate: "2024-08-02",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-bloomburrow",
    oddsNotes: "Collector Booster only. Collector main-set default-frame slots are modeled; Play Booster rarity-slot odds are not published in the article.",
    boosters: [
      makeCollectorBooster(
        "BLB",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        5,
        81,
        1,
        4,
        1,
        { rare: 0.857, mythic: 0.144 }
      ),
    ],
    cards: [],
  },
  {
    code: "DSK",
    name: "Duskmourn: House of Horror",
    releaseDate: "2024-09-27",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-duskmourn",
    oddsNotes: "Collector Booster only. The Play Booster wildcard/foil rates are not split by main-set rarity in the official article.",
    boosters: [
      makeCollectorBooster(
        "DSK",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        5,
        81,
        81 / 93,
        4,
        100 / 108,
        { rare: 0.769, mythic: 0.128 },
        100,
      ),
    ],
    cards: [],
  },
  {
    code: "FDN",
    name: "Magic: The Gathering Foundations",
    releaseDate: "2024-11-15",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-foundations",
    oddsNotes: "Models main-set default-frame cards. The foil wildcard rarity breakdown is not published, so that slot is excluded.",
    boosters: [
      makePlayBooster(
        "FDN",
        { common: 80, uncommon: 100, rare: 60, mythic: 20 },
        0.985,
        { common: 0.167, uncommon: 0.583, rare: 0.163, mythic: 0.026 },
        { rare: 0.78, mythic: 0.128 },
        {}
      ),
      makeCollectorBooster(
        "FDN",
        { common: 80, uncommon: 100, rare: 60, mythic: 20 },
        5,
        80,
        0.87,
        4,
        0.927,
        { rare: 0.857, mythic: 0.143 },
        100,
        2
      ),
    ],
    cards: [],
  },
  {
    code: "TDM",
    name: "Tarkir: Dragonstorm",
    releaseDate: "2025-04-11",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-tarkir-dragonstorm",
    oddsNotes: "Models default-frame cards from the main set; alternate treatments and bonus-sheet cards are excluded.",
    boosters: [
      makePlayBooster(
        "TDM",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        0.985,
        { common: 0.125, uncommon: 0.583, rare: 0.156, mythic: 0.026 },
        { rare: 0.75, mythic: 0.125 },
        { common: 0.565, uncommon: 0.32, rare: 0.064, mythic: 0.011 }
      ),
      makeCollectorBooster(
        "TDM",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        4,
        81,
        81 / 91,
        3,
        1,
        { rare: 0.857, mythic: 0.143 }
      ),
    ],
    cards: [],
  },
  {
    code: "DFT",
    name: "Aetherdrift",
    releaseDate: "2025-02-14",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-aetherdrift",
    oddsNotes: "Collector Booster only. Main-set default-frame commons, uncommons, and rare/mythic slot are modeled; showcase, extended-art, and Special Guests cards are excluded.",
    boosters: [
      makeCollectorBooster(
        "DFT",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        4,
        81,
        81 / 91,
        3,
        1,
        { rare: 0.857, mythic: 0.143 }
      ),
    ],
    cards: [],
  },
  {
    code: "EOE",
    name: "Edge of Eternities",
    releaseDate: "2025-08-01",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-edge-of-eternities",
    oddsNotes: "Models default-frame main-set cards. Published less-than-1% outcomes and alternate treatments are excluded.",
    boosters: [
      makePlayBooster(
        "EOE",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        0.982,
        { common: 0.125, uncommon: 0.625, rare: 0.106 },
        { rare: 0.804, mythic: 0.142 },
        { common: 0.58, uncommon: 0.32, rare: 0.064, mythic: 0.011 }
      ),
      makeCollectorBooster(
        "EOE",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        5,
        81,
        1,
        4,
        1,
        { rare: 0.86, mythic: 0.14 }
      ),
    ],
    cards: [],
  },
  {
    code: "ECL",
    name: "Lorwyn Eclipsed",
    releaseDate: "2026-01-23",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-lorwyn-eclipsed",
    oddsNotes: "Models default-frame main-set cards; fable-frame, borderless, Special Guests, and other treatments are excluded.",
    boosters: [
      makePlayBooster(
        "ECL",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        54 / 55,
        { common: 0.18, uncommon: 0.58, rare: 0.19, mythic: 0.02 },
        { rare: 0.782, mythic: 0.136 },
        { common: 0.604, uncommon: 0.298, rare: 0.065, mythic: 0.011 }
      ),
      makeCollectorBooster(
        "ECL",
        { common: 81, uncommon: 100, rare: 60, mythic: 20 },
        5,
        81,
        1,
        4,
        0.636,
        { rare: 0.855, mythic: 0.145 }
      ),
    ],
    cards: [],
  },
  {
    code: "FIN",
    name: "Magic: The Gathering—FINAL FANTASY",
    releaseDate: "2025-06-13",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-final-fantasy",
    oddsNotes: "Models default-frame main-set cards. The wildcard's combined rare/mythic rate is omitted because Wizards does not split it by rarity.",
    boosters: [
      makePlayBooster(
        "FIN",
        { common: 80, uncommon: 109, rare: 74, mythic: 20 },
        2 / 3,
        { common: 0.167, uncommon: 0.583 },
        { rare: 0.8, mythic: 0.1 },
        { common: 0.5575, uncommon: 0.359, rare: 0.055, mythic: 0.0075 }
      ),
      makeCollectorBooster(
        "FIN",
        { common: 80, uncommon: 109, rare: 74, mythic: 20 },
        3,
        80,
        1,
        3,
        1,
        { rare: 0.8775, mythic: 0.1225 }
      ),
    ],
    cards: [],
  },
  {
    code: "SPM",
    name: "Marvel's Spider-Man",
    releaseDate: "2025-09-26",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-marvels-spider-man",
    oddsNotes: "Models default-frame main-set cards; source material, alternate treatments, and related sets are excluded.",
    boosters: [
      makePlayBooster(
        "SPM",
        { common: 60, uncommon: 55, rare: 53, mythic: 15 },
        23 / 24,
        { common: 0.708, uncommon: 0.041, rare: 0.209, mythic: 0.029 },
        { rare: 0.837, mythic: 0.117 },
        { common: 0.658, uncommon: 0.241, rare: 0.078, mythic: 0.011 }
      ),
      makeCollectorBooster(
        "SPM",
        { common: 60, uncommon: 55, rare: 53, mythic: 15 },
        5,
        60,
        60 / 70,
        4,
        0.873,
        { rare: 0.779, mythic: 0.11 }
      ),
    ],
    cards: [],
  },
  {
    code: "TMT",
    name: "Magic: The Gathering | Teenage Mutant Ninja Turtles",
    releaseDate: "2026-03-06",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-teenage-mutant-ninja-turtles",
    oddsNotes: "Models default-frame main-set cards from published Play and Collector slots. Source material and Booster Fun treatments are excluded; the Play wildcard is not modeled. Scryfall currently flags these cards as non-booster and its default-frame rarity counts differ slightly from Wizards' published pools.",
    boosters: [
      makePlayBooster(
        "TMT",
        { common: 60, uncommon: 55, rare: 53, mythic: 15 },
        27 / 28,
        {},
        { rare: 0.837, mythic: 0.117 },
        { common: 0.658, uncommon: 0.241, rare: 0.078, mythic: 0.011 },
        2,
        [{
          label: "Legendary Turtle slot",
          outcomes: makeRarityOutcomes("TMT", { common: 60, uncommon: 55, rare: 53, mythic: 15 }, {
            common: 0.641,
            uncommon: 0.131,
            rare: 0.069,
            mythic: 0.034,
          }),
        }]
      ),
      makeCollectorBooster(
        "TMT",
        { common: 60, uncommon: 55, rare: 53, mythic: 15 },
        5,
        60,
        60 / 70,
        3,
        55 / 63,
        { rare: 0.779, mythic: 0.11 }
      ),
    ],
    cards: [],
  },
]

// ============================================================
// Export Sets
// ============================================================

export const SETS: SetInfo[] = [
  ...RECENT_PLAY_SETS,
  {
    code: "TLA",
    name: "Magic: The Gathering | Avatar: The Last Airbender",
    releaseDate: "2025-11-21",
    oddsSourceUrl: "https://magic.wizards.com/en/news/feature/collecting-avatar-the-last-airbender",
    oddsNotes: "Avatar's local card list is representative rather than complete.",
    boosters: [TLA_PLAY_BOOSTER, TLA_COLLECTOR_BOOSTER],
    cards: [...TLA_CARDS, ...TLE_CARDS],
  },
].sort((left, right) => left.releaseDate.localeCompare(right.releaseDate))

/**
 * Get all unique cards across all sets
 */
export function getAllCards(): Card[] {
  return SETS.flatMap((s) => s.cards)
}

/**
 * Get a set by code
 */
export function getSetByCode(code: string): SetInfo | undefined {
  return SETS.find((s) => s.code === code)
}
