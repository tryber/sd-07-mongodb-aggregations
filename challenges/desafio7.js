db.movies.aggregate([
  {
    $match: {
      languages: { $eq: "English" },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      mmedia_rating: { $avg: "$imdb.rating" },
      numeroFilmes: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
