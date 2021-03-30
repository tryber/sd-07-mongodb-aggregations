db.movies.aggregate([
  {
    $match: {
      $and: [
        { languages: { $exists: true } },
        { languages: { $in: ["English"] } },
      ],

    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" } },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      nuneroFilmes: 1,
      numeroFilmes: 1,
      mediaIMDB: {
        $round:
          ["$mediaIMDB", 1],
      },
    },
  },
]);
