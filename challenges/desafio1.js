db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $or: [
        { rated: "PG" },
        { rated: "G" },
      ],
      languages: { $all: ["English", "Spanish"] },
      genres: { $nin: ["Crime", "Horror"] },
    },
  },
]);
