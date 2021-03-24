db.movies.aggregate([
  { $match: { awards: { $regex: /Won \d Oscar/ } } },
  { $group: {
    _id: null,
    imdb_rating: { $push: "$imdb.rating" },
  } },
  { $project: {
    _id: 0,
    maior_rating: { $max: "$imdb_rating" },
    menor_rating: { $min: "$imdb_rating" },
    media_rating: { $round: [{ $avg: "$imdb_rating" }, 1] },
    desvio_padrao: { $round: [{ $stdDevSamp: "$imdb_rating" }, 1] },
  } },
]);
