db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /Won+\s+\d\s+Oscar+/i,
      },
    },
  },
  {
    $group: {
      _id: "$type",
      average: { $avg: "$imdb.rating" },
      maximo: { $max: "$imdb.rating" },
      minimo: { $min: "$imdb.rating" },
      desvio: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$maximo",
      menor_rating: "$minimo",
      media_rating: { $round: ["$average", 1] },
      desvio_padrao: { $round: ["$desvio", 1] },
    },
  },
]);
