db.movies.aggregate([
  { $match: { awards: { $exists: true, $regex: /Won.*Oscar/ } } },
  { $addFields: { numOscars: { $arrayElemAt: [{ $split: ["$awards", " "] }, 1] } } },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  { $project: {
    maior_rating: 1,
    menor_rating: 1,
    media_rating: { $round: ["$media_rating", 1] },
    desvio_padrao: { $round: ["$desvio_padrao", 1] },
    _id: 0,
  } },
]);
