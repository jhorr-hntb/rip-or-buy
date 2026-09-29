import { NextResponse } from "next/server"
import { getSetByCode, type Card, type Rarity } from "@/lib/sets-data"

const VALID_RARITIES = new Set<Rarity>(["common", "uncommon", "rare", "mythic"])
const NON_DEFAULT_FRAMES = new Set([
  "borderless",
  "extendedart",
  "showcase",
  "etched",
  "inverted",
  "nyxtouched",
  "shatteredglass",
  "colorshifted",
  "sunmoondfc",
  "mooneldrazi",
  "compassland",
  "upsidedown",
  "fullart",
])

interface ScryfallCard {
  name: string
  set: string
  rarity: string
  type_line: string
  frame_effects?: string[]
}

interface ScryfallPage {
  data: ScryfallCard[]
  has_more: boolean
  next_page?: string
}

function isDefaultFrame(card: ScryfallCard): boolean {
  return !card.frame_effects?.some((effect) => NON_DEFAULT_FRAMES.has(effect))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ setCode: string }> }
) {
  const { setCode: rawSetCode } = await params
  const setCode = rawSetCode.toUpperCase()
  const set = getSetByCode(setCode)

  if (!set || !set.oddsSourceUrl) {
    return NextResponse.json({ error: "Set catalog not found" }, { status: 404 })
  }

  const cardsByName = new Map<string, Card>()
  const boosterQuery = setCode === "TMT" ? "" : "+is%3Abooster"
  let nextPage: string | undefined =
    `https://api.scryfall.com/cards/search?q=set%3A${setCode.toLowerCase()}${boosterQuery}+game%3Apaper&unique=prints&order=set`

  try {
    while (nextPage) {
      const response = await fetch(nextPage, {
        headers: {
          Accept: "application/json",
          "User-Agent": "RipOrBuy/0.1",
        },
        next: { revalidate: 86400 },
      })
      if (!response.ok) {
        console.error("Scryfall card catalog request failed", response.status)
        return NextResponse.json({ error: "Card catalog is temporarily unavailable" }, { status: 502 })
      }

      const page = (await response.json()) as ScryfallPage
      for (const card of page.data) {
        if (
          !VALID_RARITIES.has(card.rarity as Rarity) ||
          card.type_line.includes("Land") ||
          !isDefaultFrame(card)
        ) {
          continue
        }

        if (!cardsByName.has(card.name)) {
          cardsByName.set(card.name, {
            name: card.name,
            set: card.set.toUpperCase(),
            rarity: card.rarity as Rarity,
            treatment: "default",
          })
        }
      }

      nextPage = page.has_more ? page.next_page : undefined
      if (nextPage) await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return NextResponse.json(Array.from(cardsByName.values()))
  } catch (error) {
    console.error("Scryfall card catalog request failed", error)
    return NextResponse.json({ error: "Card catalog is temporarily unavailable" }, { status: 502 })
  }
}