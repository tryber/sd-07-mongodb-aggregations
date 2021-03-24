db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
    },
  },
  {
    $match: {
      genres: { $ne: "Horror" },
    },
  },
  {
    $match: {
      genres: { $ne: "Crime" },
    },
  },
  {
    $match: {
      $or: [
        { rated: "PG" },
        { rated: "G" },
      ],
    },
  },
  {
    $match: {
      languages: {
        $all: [
          "English",
          "Spanish",
        ],
      },
    },
  },
]);
