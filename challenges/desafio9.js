db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  { $addFields: { bYear: { $toInt: "$birthYear" } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$bYear" },
    menorAnoNascimento: { $min: "$bYear" },
  } },
  { $project: { _id: 0 } },
]);
