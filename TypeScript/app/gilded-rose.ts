import { updateQuality } from "./update-quality";

/**
 * Goblin API, cannot change.
 */
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

/**
 * Goblin API, cannot change.
 */
export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // Just ignore the structure of these files we cannot change.
    // I want to write functional code...
    this.items = updateQuality(this.items).map(
      ({ name, sellIn, quality }) => new Item(name, sellIn, quality)
    );
    return this.items;
  }
}
