db.movies.aggregate([
  {
    $match: {
      languages: {
        $elemMatch: {
          $eq: "English",
        },
      },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: {
        actor: "$cast",
      },
      mediaIMDB: {
        $avg: "$imdb.rating",
      },
      numeroFilmes: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: "$_id.actor",
      numeroFilmes: "$numeroFilmes",
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
