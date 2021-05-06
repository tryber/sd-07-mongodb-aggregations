db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $group: {
    minBirthYear: { $min: { $toInt: "$birthYear" } },
    maxBirthYear: { $max: { $toInt: "$birthYear" } },
    _id: null,
  } },
  {
    $project: {
      maiorAnoNascimento: "$maxBirthYear",
      menorAnoNascimento: "$minBirthYear",
      _id: 0,
    },
  },
]);
