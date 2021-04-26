db.movies.aggregate([
  { $match: {
    languages: { $in: ["English"] },
  },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numero: { $sum: 1 },
      media: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: { $round: ["$numero", 1] },
      mediaIMDB: { $round: ["$media", 1] },
    },
  },
  { $sort: {
    numeroFilmes: -1,
    _id: -1,
  } },
]);
