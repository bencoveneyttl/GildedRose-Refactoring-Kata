export type Item = Readonly<{
  name: string;
  sellIn: number;
  quality: number;
}>;

export const enum Names {
  AGED_BRIE = "Aged Brie",
  SULFURAS = "Sulfuras, Hand of Ragnaros",
  BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert",
  CONJURED = "Conjured Mana Cake",
}

const MAX_QUALITY = 50;

export function updateQuality(items: Readonly<Item[]>): Readonly<Item[]> {
  return items.map((item) => {
    const sellIn = nextSellIn(item);
    const quality = clamp(nextQuality({ ...item, sellIn }), 0, MAX_QUALITY);
    return {
      ...item,
      sellIn,
      quality,
    };
  });
}

function nextSellIn({ name, sellIn }: Item): number {
  switch (name) {
    case Names.SULFURAS:
      return sellIn;
    default:
      return sellIn - 1;
  }
}

function nextQuality({ name, quality, sellIn }: Item): number {
  const expired = sellIn < 0;
  switch (name) {
    case Names.AGED_BRIE:
      return quality + (expired ? 2 : 1);
    case Names.BACKSTAGE_PASS:
      if (expired) {
        return 0;
      } else if (sellIn < 5) {
        return quality + 3;
      } else if (sellIn < 10) {
        return quality + 2;
      }
      return quality + 1;
    case Names.CONJURED:
      return quality - (expired ? 4 : 2);
    case Names.SULFURAS:
      return quality;
    default:
      return quality - (expired ? 2 : 1);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min);
}
