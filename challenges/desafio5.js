const fav = ["Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $match: {
      cast: {
        $in: fav,
      },
    },
  },
  {
    $group: {
      _id: {
        title: "$title",
        viewer_rating: "$tomatoes.viewer.rating",
      },
      num_favs: { $sum: 1 },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "_id.viewer_rating": -1,
      "_id.title": -1,
    },
  },
  {
    $project: {
      _id: 0,
      title: "$_id.title",
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
