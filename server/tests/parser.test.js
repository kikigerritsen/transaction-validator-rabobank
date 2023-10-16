const fs = require("fs");

const { convertFileContentsToObject } = require("../utils/parser.utils");
const { expectedCsv, expectedXml } = require("./test-files/expected");

describe("convertFileContentsToObject", () => {
  describe("CSV", () => {
    test("should convert CSV file to object correctly", () => {
      const filePath = __dirname + "/test-files/csv/test.csv";
      const fileContents = fs.readFileSync(filePath, "utf8");

      const records = convertFileContentsToObject(filePath, fileContents);
      expect(records).toEqual(expectedCsv);
    });

    test("should compile when the contents are incomplete but the record is valid", () => {
      const filePath = __dirname + "/test-files/csv/incompleteButValid.csv";
      const fileContents = fs.readFileSync(filePath, "utf8");
      const expected = expectedCsv;

      const records = convertFileContentsToObject(filePath, fileContents);

      expect(records).toEqual(
        expected.map((record) => {
          if (record.reference === "183398") {
            return {
              ...record,
              accountNumber: "",
              endBalance: NaN,
            };
          }
          return {
            ...record,
          };
        })
      );
    });

    test("should compile when the contents are missing but the record reference is in place", () => {
      const filePath = __dirname + "/test-files/csv/incorrect.csv";
      const fileContents = fs.readFileSync(filePath, "utf8");
      const expected = expectedCsv;

      const records = convertFileContentsToObject(filePath, fileContents);

      expect(records).toEqual(
        expected.map((record) => {
          if (record.reference === "183398") {
            return {
              ...record,
              accountNumber: undefined,
              description: undefined,
              endBalance: NaN,
              mutation: undefined,
              startBalance: NaN,
              mutationType: undefined,
            };
          }
          return record;
        })
      );
    });

    test("should compile when the reference is missing", () => {
      const filePath = __dirname + "/test-files/csv/missingReference.csv";
      const fileContents = fs.readFileSync(filePath, "utf8");
      const expected = expectedCsv;

      const records = convertFileContentsToObject(filePath, fileContents);

      expect(records).toEqual(
        expected.map((record) => {
          if (record.reference === "183398") {
            return {
              ...record,
              reference: "",
              mutationType: "+",
            };
          }
          return record;
        })
      );
    });
  });

  describe("XML", () => {
    test("should convert XML file to object correctly", () => {
      const filePath = __dirname + "/test-files/xml/test.xml";
      const fileContents = fs.readFileSync(filePath, "utf8");

      const records = convertFileContentsToObject(filePath, fileContents);
      expect(records).toEqual(expectedXml);
    });

    test("should compile when the contents are incomplete but the record is valid", () => {
      const filePath = __dirname + "/test-files/xml/incompleteButValid.xml";
      const fileContents = fs.readFileSync(filePath, "utf8");

      const records = convertFileContentsToObject(filePath, fileContents);

      expect(records).toEqual(
        expectedXml.map((record) => {
          if (record.reference === "138932") {
            return {
              ...record,
              accountNumber: undefined,
              endBalance: NaN,
              mutationType: "+",
            };
          }
          return record;
        })
      );
    });

    test("should compile when the contents are missing but the record reference is in place", () => {
      const filePath = __dirname + "/test-files/xml/incorrect.xml";
      const fileContents = fs.readFileSync(filePath, "utf8");

      const records = convertFileContentsToObject(filePath, fileContents);

      expect(records).toEqual(
        expectedXml.map((record) => {
          if (record.reference === "138932") {
            return {
              ...record,
              accountNumber: undefined,
              description: undefined,
              endBalance: NaN,
              mutation: undefined,
              startBalance: NaN,
              mutationType: undefined,
            };
          }
          return record;
        })
      );
    });

    test("should compile when the reference is missing", () => {
      const filePath = __dirname + "/test-files/xml/missingReference.xml";
      const fileContents = fs.readFileSync(filePath, "utf8");

      const records = convertFileContentsToObject(filePath, fileContents);

      expect(records).toEqual(
        expectedXml.map((record) => {
          if (record.reference === "138932") {
            return {
              ...record,
              reference: undefined,
            };
          }
          return record;
        })
      );
    });
  });

  test("should fail when posting a non .xml/.csv file", () => {
    const filePath = __dirname + "/test-files/test.html";
    const fileContents = fs.readFileSync(filePath, "utf8");

    const records = convertFileContentsToObject(filePath, fileContents);
    expect(records).toEqual({ error: "Invalid file extension" });
  });
});
