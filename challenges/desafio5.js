const fav = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate([
  {
    $match: {
      countries: { $all: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      initial_array: {
        $setIntersection: ["$cast", fav],
      },
    },
  },
  {
    $match: {
      initial_array: {
        $ne: null,
      },
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      "tomatoes.viewer.rating": 1,
      num_favs: {
        $size: "$initial_array",
      },
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
    $project: {
      title: 1,
    },
  },
  {
    $skip: 24,
  },
  { $limit: 1 },
]);
