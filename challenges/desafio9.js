db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $ne: "",
        $exists: true,
      },
    },
  },
  {
    $addFields: {
      anoNascimento: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$anoNascimento" },
      menorAnoNascimento: { $min: "$anoNascimento" },
    },
  },
  { $project: { _id: 0 } },
]);
