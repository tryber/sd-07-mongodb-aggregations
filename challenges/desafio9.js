db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "" },
    },
  },
  {
    $group: {
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
      _id: null,
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
