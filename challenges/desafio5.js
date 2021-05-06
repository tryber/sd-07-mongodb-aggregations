const actors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [actors, "$cast"],
        },
      },
    },
  },
  {
    $match: {
      countries: {
        $all: ["USA"],
      },
      "tomatoes.viewer.rating": {
        $gte: 3,
      },
      cast: {
        $exists: true,
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
      title: true,
      _id: false,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
]);
