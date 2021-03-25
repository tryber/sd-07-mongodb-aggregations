const birthYearWithValue = { birthYear: { $nin: ["", null] } };
const keybirthYear = { birthYear: { $exists: true } };

db.trips.aggregate([
  { $match: { $and: [keybirthYear, birthYearWithValue] } },
  {
    $group: {
      _id: { $convert: { input: "$birthYear", to: "int" } },
    },
  },
  {
    $group: {
      _id: null,
      maior: { $max: "$_id" },
      menor: { $min: "$_id" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$maior",
      menorAnoNascimento: "$menor",
    },
  },
]);
