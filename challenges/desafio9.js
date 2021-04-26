db.trips.aggregate([
  {
    $match: { birthYear: { $ne: "" } },
  },
  {
    $set: {
      nascimentoint: { $toInt: "$birthYear" },
    },
  },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$nascimentoint" },
    menorAnoNascimento: { $min: "$nascimentoint" },
  } },
  { $project: {
    _id: 0,
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
  } },
]);
