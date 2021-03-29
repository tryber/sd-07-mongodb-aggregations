db.movies.aggregate(
  {
    $match: {
      $and: [
        { countries: { $eq: "USA" } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
      ],
    },
  },
  { $unwind: "$cast" },
  {
    $match: {
      cast: {
        $in: [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
      },
    },
  },
  {
    $group: {
      _id: {
        title: "$title",
        rating: "$tomatoes.viewer.rating",
      },
      num_favs: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "_id.rating": -1,
      "_id.title": -1,
    },
  },
  {
    $project: {
      _id: 0,
      title: "$_id.title",
    },
  },
  { $skip: 24 },
  { $limit: 1 },
);
