db.movies.aggregate([
  {
    $match: {
      awards: { $exists: true, $regex: /^Won/ },
      type: "movie",
    },
  },
  {
    $group: {
      _id: "imdb.rating",
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$maior_rating", 2] },
      menor_rating: { $round: ["$menor_rating", 2] },
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
