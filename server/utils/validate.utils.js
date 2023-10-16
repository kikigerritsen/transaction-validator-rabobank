const getNonUniqueReferences = (records) => {
  const references = records.map((record) => record.reference);
  const nonUniqueReferences = references.filter(
    (reference, index) => references.indexOf(reference) !== index
  );

  return records.filter((record) =>
    nonUniqueReferences.includes(record.reference)
  );
};

const getInvalidBalances = (records) => {
  return records.filter((record) => {
    const { startBalance, mutation, endBalance, mutationType } = record;
    const calculatedEndBalance =
      mutationType === "-"
        ? parseFloat((startBalance - mutation).toFixed(2))
        : parseFloat((startBalance + mutation).toFixed(2));
    return calculatedEndBalance !== endBalance;
  });
};

module.exports = {
  getNonUniqueReferences,
  getInvalidBalances,
};
