db.trips.aggregate([
  { $match: { birthYear: { $ne: "" } } },
  {
    $group: {
      _id: null,
      maior_ano_nascimento: { $max: { $toInt: "$birthYear" } },
      menor_ano_nascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$maior_ano_nascimento",
      menorAnoNascimento: "$menor_ano_nascimento",
    },
  },
]);
