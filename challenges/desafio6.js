db.movies.aggregate([
  { $match: { awards: {
    $regex: /^Won.*oscar/i,
  } } },
  { $group: {
    _id: null,
    max: { $max: "$imdb.rating" },
    min: { $min: "$imdb.rating" },
    media: { $avg: "$imdb.rating" },
    stdDev: { $stdDevSamp: "$imdb.rating" },
  } },
  { $project: {
    _id: 0,
    maior_rating: "$max",
    menor_rating: "$min",
    media_rating: { $round: ["$media", 1] },
    desvio_padrao: { $round: ["$stdDev", 1] },
  } },
]);
