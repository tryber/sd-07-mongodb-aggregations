db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true, $ne: "" } },
  },
  {
    $addFields: {
      dataNascimento: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: "$dataNascimento",
      },
      menorAnoNascimento: {
        $min: "$dataNascimento",
      },
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
