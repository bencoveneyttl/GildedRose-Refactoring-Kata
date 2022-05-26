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

export function updateQuality(items: Readonly<Item[]>): Readonly<Item[]> {
  return items.map((item) => {
    const sellIn = nextSellIn(item);
    return {
      ...item,
      sellIn,
      quality: nextQuality({ ...item, sellIn }),
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
      return clampQuality(quality + (expired ? 2 : 1));
    case Names.BACKSTAGE_PASS:
      return clampQuality(
        expired ? 0 : quality + (sellIn < 5 ? 3 : sellIn < 10 ? 2 : 1)
      );
    case Names.CONJURED:
      return clampQuality(quality - (expired ? 4 : 2));
    case Names.SULFURAS:
      return quality;
    default:
      return clampQuality(quality - (expired ? 2 : 1));
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
function clampQuality(value: number): number {
  return Math.max(Math.min(value, MAX_QUALITY), MIN_QUALITY);
}
