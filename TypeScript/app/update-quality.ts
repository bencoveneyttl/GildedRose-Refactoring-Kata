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

export function updateQuality(items: Item[]): Item[] {
  return items.map(getNewItem);
}

function getNewItem(item: Item): Item {
  const sellIn = getNewSellIn(item);
  // Quality relies on the updated sellIn property.
  const quality = getNewQuality({...item, sellIn});
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

const MAX_QUALITY = 50;

function getNewQuality(item: Item): number {
  let newQuality = item.quality;
  if (
    item.name != ItemNames.AGED_BRIE &&
    item.name != ItemNames.BACKSTAGE_PASS
  ) {
    if (newQuality > 0) {
      if (item.name != ItemNames.SULFURAS) {
        newQuality = newQuality - 1;
      }
    }
  } else {
    if (newQuality < MAX_QUALITY) {
      newQuality = newQuality + 1;
      if (item.name == ItemNames.BACKSTAGE_PASS) {
        if (item.sellIn < 10) {
          if (newQuality < MAX_QUALITY) {
            newQuality = newQuality + 1;
          }
        }
        if (item.sellIn < 5) {
          if (newQuality < MAX_QUALITY) {
            newQuality = newQuality + 1;
          }
        }
      }
    }
  }
  if (item.sellIn < 0) {
    if (item.name != ItemNames.AGED_BRIE) {
      if (item.name != ItemNames.BACKSTAGE_PASS) {
        if (newQuality > 0) {
          if (item.name != ItemNames.SULFURAS) {
            newQuality = newQuality - 1;
          }
        }
      } else {
        newQuality = 0;
      }
    } else {
      if (newQuality < MAX_QUALITY) {
        newQuality = newQuality + 1;
      }
    }
  }
  return newQuality;
}
