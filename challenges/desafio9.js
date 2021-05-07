db.trips.aggregate([
  {
    $match: {
      $and: [
        { birthYear: { $exists: 1 } },
        { birthYear: { $ne: "" } },
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
      maiorAnoNascimento: { $max: "$convertedBirthYear" },
      menorAnoNascimento: { $min: "$convertedBirthYear" },
      _id: null,
    },
  },
  { $project: { _id: 0 } },
]);
