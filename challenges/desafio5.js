const favList = ["Sandra Bullock",
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
  { $unwind: "$cast" },
  {
    $match: {
      cast: { $in: favList },
    },
  },
  {
    $group: {
      _id: { title: "$title", rating: "$tomatoes.viewer.rating" },
      num_fav: { $sum: 1 },
    },
  },
  { $sort: {
    num_fav: -1,
    "_id.rating": -1,
    "_id.title": -1 },
  },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      title: "$_id.title",
    },
  },

]);
