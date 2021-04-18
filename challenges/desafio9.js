// Ref: https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/

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
      birthYearDocuments: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: "$birthYearDocuments",
      },
      menorAnoNascimento: {
        $min: "$birthYearDocuments",
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
