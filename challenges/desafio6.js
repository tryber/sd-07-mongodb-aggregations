db.movies.aggregate([
  { $match: { awards: { $regex: /Won.*Oscar/ } } },
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
