const parser = require("xml2json");

exports.convertFileContentsToObject = (fileName, file) => {
  const extension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2); // Extract the file extension

  switch (extension) {
    case "csv":
      const csvRecords = file.split("\n").map((line) => {
        const [
          reference,
          accountNumber,
          description,
          startBalance,
          mutation,
          endBalance,
        ] = line.split(",");
        return {
          reference,
          accountNumber,
          description,
          startBalance: parseFloat(startBalance),
          mutation: parseFloat(mutation),
          endBalance: parseFloat(endBalance),
        };
      });
      const removeFirstIndex = csvRecords.slice(1);
      return removeFirstIndex;
    case "xml":
      const xmlRecords = JSON.parse(parser.toJson(file)).records.record.map(
        (record) => {
          console.log(typeof record.accountNumber);
          return {
            reference:
              typeof record.reference === "string"
                ? record.reference
                : undefined,
            accountNumber:
              typeof record.accountNumber === "string"
                ? record.accountNumber
                : undefined,
            description:
              typeof record.description === "string"
                ? record.description
                : undefined,
            startBalance: parseFloat(record.startBalance),
            mutation: parseFloat(record.mutation),
            endBalance: parseFloat(record.endBalance),
          };
        }
      );
      return xmlRecords;
    default:
      return {
        error: "Invalid file extension",
      };
  }
};
