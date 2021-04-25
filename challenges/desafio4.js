db.movies.aggregate([
  {
    $addFields: {
      totalWords: { $size: { $split: ["$title", " "] } },
    },
  },
  {
    $match: {
      totalWords: 1,
    },
  },
  {
    $project: {
      _id: 0,
      title_split: ["$title"],
    },
  },

  {
    $sort: {
      title_split: 1,
    },
  },
]);
