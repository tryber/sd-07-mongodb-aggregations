db.movies.aggregate([
  { $match: { languages: { $in: ["English"] } } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    ratingAverage: { $avg: "$imdb.rating" },
    numeroFilmes: { $sum: 1 },
  } },
  { $project: {
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$ratingAverage", 1] },
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
