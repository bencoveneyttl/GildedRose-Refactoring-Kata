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
  return items.map((item) => {
    if (
      item.name != ItemNames.AGED_BRIE &&
      item.name != ItemNames.BACKSTAGE_PASS
    ) {
      if (item.quality > 0) {
        if (item.name != ItemNames.SULFURAS) {
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == ItemNames.BACKSTAGE_PASS) {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
    if (item.name != ItemNames.SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != ItemNames.AGED_BRIE) {
        if (item.name != ItemNames.BACKSTAGE_PASS) {
          if (item.quality > 0) {
            if (item.name != ItemNames.SULFURAS) {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
    return item;
  });
}
