db.movies.aggregate([
  { $match: { awards: { $exists: true, $regex: /won/i }, type: "movie" } },
  {
    $group: {
      _id: null,
      maiorRating: { $max: "$imdb.rating" },
      menorRating: { $min: "$imdb.rating" },
      mediaRating: { $avg: "$imdb.rating" },
      desvioPadrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$maiorRating",
      menor_rating: "$menorRating",
      media_rating: { $round: ["$mediaRating", 1] },
      desvio_padrao: { $round: ["$desvioPadrao", 1] },
    },
  },
]);
