db.movies.aggregate([
  {
    $match: { awards: { $regex: /^Won [1-9][0-9]? Oscars?/ } },
  },
  {
    $group: {
      minRating: { $min: "$imdb.rating" },
      maxRating: { $max: "$imdb.rating" },
      avgRating: { $avg: "$imdb.rating" },
      stdDevRating: { $stdDevSamp: "$imdb.rating" },
      _id: null,
    },
  },
  {
    $project: {
      maior_rating: { $round: ["$maxRating", 1] },
      menor_rating: { $round: ["$minRating", 1] },
      media_rating: { $round: ["$avgRating", 1] },
      desvio_padrao: { $round: ["$stdDevRating", 1] },
      _id: 0,
    },
  },
]);
