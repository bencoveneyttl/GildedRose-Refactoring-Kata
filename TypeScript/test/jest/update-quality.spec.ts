import { Item, Names, updateQuality } from "@/update-quality";

describe("updateQuality", () => {
  it("should handle empty input", () => {
    expect(updateQuality([])).toMatchSnapshot();
  });

  it("should lower SellIn and Quality at the end of each day", () => {
    expect(updateQuality([
      { name: "foo", quality: 5, sellIn: 5 },
      { name: "bar", quality: 10, sellIn: 1 },
      { name: "baz", quality: 1, sellIn: 10 },
    ])).toMatchSnapshot();
  });

  it("should lower quality twice as fast once the sell by date has passed", () => {
    expect(updateQuality([
      { name: "foo", quality: 5, sellIn: 1 },
      { name: "bar", quality: 5, sellIn: 0 },
      { name: "baz", quality: 5, sellIn: -1 },
    ])).toMatchSnapshot();});

  it("should never create a negative quality", () => {
    expect(updateQuality([
      { name: "foo", quality: 0, sellIn: 1 },
      { name: "bar", quality: 1, sellIn: -1 },
      { name: "baz", quality: 0, sellIn: -1 },
    ])).toMatchSnapshot();
  });

  it("should increase the quality for aged brie as time passes", () => {
    expect(updateQuality([
      { name: Names.AGED_BRIE, quality: 5, sellIn: 5 },
      { name: Names.AGED_BRIE, quality: 10, sellIn: 1 },
      { name: Names.AGED_BRIE, quality: 1, sellIn: -1 },
    ])).toMatchSnapshot();
  });

  it("should never increase quality more than 50", () => {
    expect(updateQuality([
      { name: Names.AGED_BRIE, quality: 50, sellIn: 1 },
      { name: Names.AGED_BRIE, quality: 50, sellIn: -1 },
      { name: Names.AGED_BRIE, quality: 49, sellIn: -1 },
    ])).toMatchSnapshot();
  });

  it("should never increase quality more than 50", () => {
    expect(updateQuality([
      { name: Names.AGED_BRIE, quality: 50, sellIn: 1 },
      { name: Names.AGED_BRIE, quality: 50, sellIn: -1 },
      { name: Names.AGED_BRIE, quality: 49, sellIn: -1 },
    ])).toMatchSnapshot();
  });

  it('should never update the sell by date or quality of "Sulfuras"', () => {
    expect(updateQuality([
      { name: Names.SULFURAS, quality: 5, sellIn: 5 },
      { name: Names.SULFURAS, quality: 10, sellIn: 1 },
      { name: Names.SULFURAS, quality: 1, sellIn: 10 },
    ])).toMatchSnapshot();
  });

  it('should increase the quality of "Backstage Passes" by 2 when the sell by date is 10 days or less', () => {
    expect(updateQuality([
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 6 },
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 10 },
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 11 },
    ])).toMatchSnapshot();
  });

  it('should increase the quality of "Backstage Passes" by 3 when the sell by date is 5 days or less', () => {
    expect(updateQuality([
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 5 },
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 3 },
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 1 },
    ])).toMatchSnapshot();
  });

  it('should drop the quality of "Backstage Passes" to 0 when the sell by date has passed', () => {
    expect(updateQuality([
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: 0 },
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: -1 },
      { name: Names.BACKSTAGE_PASS, quality: 10, sellIn: -2 },
    ])).toMatchSnapshot();
  });

  it('should degrade the quality of "Conjured" items twice as fast', () => {
    expect(updateQuality([
      { name: Names.CONJURED, quality: 5, sellIn: 5 },
      { name: Names.CONJURED, quality: 10, sellIn: 1 },
      { name: Names.CONJURED, quality: 1, sellIn: -1 },
    ])).toMatchSnapshot();
  });
});
