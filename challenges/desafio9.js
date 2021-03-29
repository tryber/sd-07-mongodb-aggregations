db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $ne: "" } },
        { birthYear: { $exists: 1 } },
      ],
    },
  },
  {
    $addFields: {
      convertedBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedBirthYear" },
      menorAnoNascimento: { $min: "$convertedBirthYear" },
    },
  },
  { $project: { _id: 0 } },
]);
