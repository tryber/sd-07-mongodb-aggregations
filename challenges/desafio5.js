db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      $or: [
        { cast: "Tom Hanks" },
        { cast: "George Clooney" },
        { cast: "Sandra Bullock" },
        { cast: "Julia Roberts" },
        { cast: "Kevin Spacey" },
      ],
    },
  },
  {
    $addFields: {
      atores: {
        $setIntersection: ["$cast", ["Tom Hanks", "George Clooney", "Sandra Bullock", "Julia Roberts", "Kevin Spacey"]],
      },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$atores" },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
