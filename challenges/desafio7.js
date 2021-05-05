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
      media_rating: { $avg: "$imdb.rating" },
      numeroFilmes: { $sum: 1 },
    },
  },
  {
    $sort: {
      numeroFilmes: -1, // A ordem do sort importa!
      _id: -1,
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$media_rating", 1] },
    },
  },
]);
