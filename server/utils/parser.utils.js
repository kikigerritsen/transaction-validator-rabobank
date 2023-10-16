const parser = require("xml2json");

const getMutation = (record) => {
  if (!record.mutation) {
    return {
      ...record,
      mutation: undefined,
      mutationType: undefined,
    };
  }
  const retrunThis = {
    ...record,
    mutation: parseFloat(
      record.mutation
        ? record.mutation.substr(1, record.mutation.length - 1)
        : undefined
    ),
    mutationType: record.mutation
      ? record.mutation.charAt(0) === "-"
        ? "-"
        : "+"
      : undefined,
  };
  return retrunThis;
};

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
          mutation,
          endBalance: parseFloat(endBalance),
        };
      });
      const removeFirstIndex = csvRecords.slice(1);
      if (removeFirstIndex[removeFirstIndex.length - 1].reference === "") {
        removeFirstIndex.splice(removeFirstIndex.length - 1, 1);
      }
      return removeFirstIndex.map((record) => getMutation(record));
    case "xml":
      const xmlRecords = JSON.parse(parser.toJson(file)).records.record.map(
        (record) => {
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
            mutation:
              typeof record.mutation === "string" ? record.mutation : undefined,
            endBalance: parseFloat(record.endBalance),
          };
        }
      );
      return xmlRecords.map((record) => getMutation(record));
    default:
      return {
        error: "Invalid file extension",
      };
  }
};
