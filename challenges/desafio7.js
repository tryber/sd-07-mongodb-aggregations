db.movies.aggregate([
  {
    $match: {
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      movies: { $push: "$_id" },
      ratesIMDB: { $push: "$imdb.rating" },
    },
  },
  {
    $project: {
      numeroFilmes: { $size: "$movies" },
      mediaIMDB: { $round: [{ $avg: "$ratesIMDB" }, 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
