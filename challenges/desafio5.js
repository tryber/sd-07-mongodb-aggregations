atores = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: { $eq: "USA" },
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $exists: true },
    },
  },
  {
    $addFields: {
      num_favs: { // esse campo vai representar quantos atores da lista estaram presentes
        // em cast
        $size: {
          $setIntersection: ["$cast", atores],
          // retorna o que é comum nos dois
          // ignora entradas duplicadas
        },
      },
    },
  },
  { $sort: {
    num_favs: -1, // ordeno a lista
    "tomatoes.viewer.rating": -1,
    title: -1,
  },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  { $project:
    {
      _id: 0, title: 1, // projeto so o que eu quero
    },
  },
]);
