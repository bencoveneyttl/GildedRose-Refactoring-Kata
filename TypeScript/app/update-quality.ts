export type Item = {
  name: string;
  sellIn: number;
  quality: number;
}

export const enum ItemNames {
  AGED_BRIE = 'Aged Brie',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED = 'Conjured Mana Cake',
}

export function updateQuality(items: Item[]): Item[] {
  for (let i = 0; i < items.length; i++) {
    if (items[i].name != ItemNames.AGED_BRIE && items[i].name != ItemNames.BACKSTAGE_PASS) {
      if (items[i].quality > 0) {
        if (items[i].name != ItemNames.SULFURAS) {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == ItemNames.BACKSTAGE_PASS) {
          if (items[i].sellIn < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sellIn < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != ItemNames.SULFURAS) {
      items[i].sellIn = items[i].sellIn - 1;
    }
    if (items[i].sellIn < 0) {
      if (items[i].name != ItemNames.AGED_BRIE) {
        if (items[i].name != ItemNames.BACKSTAGE_PASS) {
          if (items[i].quality > 0) {
            if (items[i].name != ItemNames.SULFURAS) {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }

  return items;
}