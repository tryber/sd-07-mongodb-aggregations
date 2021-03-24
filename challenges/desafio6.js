db.movies.aggregate([
  { $match: { awards: { $regex: /Won.*Oscar/ } } },
  { $group: {
    _id: null,
    rating_imdb: { $push: "$imdb.rating" },
  } },
  { $project: {
    maior_rating: { $max: "$rating_imdb" },
    menor_rating: { $min: "$rating_imdb" },
    media_rating: { $round: [{ $avg: "$rating_imdb" }, 1] },
    desvio_padrao: { $round: [{ $stdDevSamp: "$rating_imdb" }, 1] },
    _id: 0,
  } },
]);
