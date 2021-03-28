db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: { $exists: true, $all: ["English"] },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numero_filmes: { $sum: 1 },
      media_imdb: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numeroFilmes: "$numero_filmes",
      mediaIMDB: { $round: ["$media_imdb", 1] },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
