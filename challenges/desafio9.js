db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "", $exists: true },
    },
  },
  {
    $addFields: {
      birthYearInt: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYearInt" },
      menorAnoNascimento: { $min: "$birthYearInt" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
