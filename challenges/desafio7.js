db.movies.aggregate([
  {
    $match: { languages: "English" },
  },
  { $unwind: "$cast" },
  {
    $group: {
      count: { $sum: 1 },
      avgIMDB: { $avg: "$imdb.rating" },
      _id: "$cast",
    },
  },
  {
    $project: {
      numeroFilmes: "$count",
      mediaIMDB: { $round: ["$avgIMDB", 1] },
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
