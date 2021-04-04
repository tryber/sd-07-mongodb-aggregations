db.movies.aggregate([{
  $match: {
    "imdb.rating": { $gte: 7 },
    genres: { $nin: ["Horror", "Crime"] },
    $or: [{ rated: "PG" }, { rated: "G" }],
    languages: { $all: ["English", "Spanish"] },
  },
},
]);
