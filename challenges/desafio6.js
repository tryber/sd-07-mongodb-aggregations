db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /Won \d Oscar/,
      },
    },
  },
  {
    $group: {
      _id: "$title",
      avaliacao: { $push: "$imdb.rating" },
    },
  },
]);
