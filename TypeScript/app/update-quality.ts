export type Item = {
  name: string;
  sellIn: number;
  quality: number;
};

export const enum ItemNames {
  AGED_BRIE = "Aged Brie",
  SULFURAS = "Sulfuras, Hand of Ragnaros",
  BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert",
  CONJURED = "Conjured Mana Cake",
}

const MAX_QUALITY = 50;

export function updateQuality(items: Item[]): Item[] {
  return items.map(getNewItem);
}

function getNewItem(item: Item): Item {
  const sellIn = getNewSellIn(item);
  // Quality relies on the updated sellIn property.
  const quality = clamp(getNewQuality({ ...item, sellIn }), 0, MAX_QUALITY);
  return {
    ...item,
    sellIn,
    quality,
  };
}

function getNewSellIn(item: Item): number {
  switch (item.name) {
    case ItemNames.SULFURAS:
      return item.sellIn;
    default:
      return item.sellIn - 1;
  }
}

function getNewQuality(item: Item): number {
  const expired = item.sellIn < 0;
  switch (item.name) {
    case ItemNames.AGED_BRIE:
      return item.quality + (expired ? 2 : 1);
    case ItemNames.BACKSTAGE_PASS:
      if (expired) {
        return 0;
      } else if (item.sellIn < 5) {
        return item.quality + 3;
      } else if (item.sellIn < 10) {
        return item.quality + 2;
      }
      return item.quality + 1;
    case ItemNames.CONJURED:
      return item.quality - 2;
    case ItemNames.SULFURAS:
      return item.quality;
    default:
      return item.quality - (expired ? 2 : 1);
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}
