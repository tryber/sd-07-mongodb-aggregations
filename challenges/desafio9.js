db.getCollection("trips")
  .aggregate([
    { $match: { $nor: [{ birthYear: { $exists: false } }, { birthYear: "" }] } },
    { $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } } } },
    { $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    } },
  ]);
