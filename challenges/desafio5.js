db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  {
    $addFields: {
      num_favs: {
        $setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]],
      },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: { $ifNull: ["$num_favs", []] },
      },
    },
  },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $project: {
    title: 1,
    _id: 0,
  } },
  { $skip: 24 },
  { $limit: 1 },
]);
