db.movies.aggregate([
  {
    $match: {
      countries: ["USA"],
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      commonToBoth: {
        $setIntersection: ["$cast",
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
        ],
      },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      num_favs: { $cond: { if: { $isArray: "$commonToBoth" }, then: { $size: "$commonToBoth" }, else: 0 } },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $group: {
      _id: null,
      titles: { $push: "$title" },
    },
  },
  {
    $project: {
      _id: 0,
      title: { $arrayElemAt: ["$titles", 25] },
    },
  },
]);
