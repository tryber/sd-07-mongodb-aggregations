db.getCollection("movies")
  .aggregate([
    {
      $unwind: "$cast",
    },
    {
      $match: {
        languages: "English",
      },
    },
    {
      $group: {
        _id: "$cast",
        numeroFilmes: { $sum: 1 },
        avgIMDB: { $avg: "$imdb.rating" },
      },
    },
    {
      $project: {
        numeroFilmes: 1,
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
