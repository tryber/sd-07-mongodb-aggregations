db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { countries: { $in: ["USA"] } },
          { "tomatoes.viewer.rating": { $gte: 3 } },
        ],
      },
    },
    {
      $addFields: {
        trybeFavs: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
      },
    },
    {
      $addFields: {
        numFavs: { $setIntersection: ["$trybeFavs", "$cast"] },
      },
    },
    {
      $match: {
        numFavs: { $not: { $in: [null, []] } },
      },
    },
    {
      $addFields: {
        num_favs: { $size: "$numFavs" },
      },
    },
    {
      $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        title: 1,
      },
    },
  ],
);
