const { getInvalidBalances } = require("../utils/validate.utils");
const { expectedCsv, expectedXml } = require("./test-files/expected");

describe("getInvalidBalances", () => {
  describe("CSV", () => {
    it("should return an array of records with invalid balances", () => {
      const invalidBalances = getInvalidBalances(expectedCsv);
      expect(invalidBalances).toEqual([]);
    });

    it("should handle floating point precision correctly", () => {
      const invalidBalances = getInvalidBalances(expectedCsv);
      expect(invalidBalances).toEqual([]);
    });
  });
  describe("XML", () => {
    it("should return an array of records with invalid balances", () => {
      const invalidBalances = getInvalidBalances(expectedXml);
      expect(invalidBalances).toEqual([
        {
          accountNumber: "NL93ABNA0585619023",
          description: "Candy from Vincent de Vries",
          endBalance: 6368,
          mutation: 939,
          mutationType: "-",
          reference: "131254",
          startBalance: 5429,
        },
        {
          accountNumber: "NL43AEGO0773393871",
          description: "Subscription for Erik de Vries",
          endBalance: 4981,
          mutation: 1000,
          mutationType: "+",
          reference: "192480",
          startBalance: 3980,
        },
      ]);
    });

    it("should handle floating point precision correctly", () => {
      const invalidBalances = getInvalidBalances(expectedXml);
      expect(invalidBalances).toEqual([
        {
          accountNumber: "NL93ABNA0585619023",
          description: "Candy from Vincent de Vries",
          endBalance: 6368,
          mutation: 939,
          mutationType: "-",
          reference: "131254",
          startBalance: 5429,
        },
        {
          accountNumber: "NL43AEGO0773393871",
          description: "Subscription for Erik de Vries",
          endBalance: 4981,
          mutation: 1000,
          mutationType: "+",
          reference: "192480",
          startBalance: 3980,
        },
      ]);
    });
  });
});
