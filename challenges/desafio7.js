db.movies.aggregate([
  {
    $match: {
      cast: { $exists: 1 },
      languages: { $all: ["English"] },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numberOfFilms: { $sum: 1 },
      avgIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: "$numberOfFilms",
      mediaIMDB: { $round: ["$avgIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
