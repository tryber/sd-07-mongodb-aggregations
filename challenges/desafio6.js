db.movies.aggregate([
  // regex referência gitHub do Carlos8v https://github.com/carlos8v
  { $match: { awards: { $regex: /Won \d Oscar/ } } },
  {
    $group: {
      _id: null,
      rating: { $push: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $max: "$rating" },
      menor_rating: { $min: "$rating" },
      media_rating: { $round: [{ $avg: "$rating" }, 1] },
      desvio_padrao: { $round: [{ $stdDevSamp: "$rating" }, 1] },
    },
  },
]);
