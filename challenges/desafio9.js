db.trips.aggregate([
  { $match: { birthYear: { $ne: "", $exists: true } } },
  {
    $group: {
      _id: null,
      birthYearArray: { $push: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: { $max: "$birthYearArray" },
      menorAnoNascimento: { $min: "$birthYearArray" },
    },
  },
]);
