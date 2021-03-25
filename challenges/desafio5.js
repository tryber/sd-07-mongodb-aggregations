const atores = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      "tomatoes.viewer.rating": { $gte: 3 },
      countries: "USA",
    },
  },
  {
    $addFields: {
      qtdAtores: {
        $cond: {
          if: { $isArray: "$cast" },
          then: { $size: { $setIntersection: [atores, "$cast"] } },
          else: 0,
        },
      },
    },
  },
  {
    $sort: {
      qtdAtores: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
