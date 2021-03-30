db.movies.aggregate([
  {
    $addFields: {
      favoritos: [
        "Sandra Bullock",
        "Tom Hanks",
        "Julia Roberts",
        "Kevin Spacey",
        "George Clooney",
      ],
    },
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: ["$cast", "$favoritos"] } },
    },
  },
  {
    $match: {
      $and: [
        { countries: { $eq: "USA" } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $exists: true } },
      ],
    },
  },

  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1, _id: 0 } },
]);
