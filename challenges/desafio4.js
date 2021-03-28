db.movies.aggregate([
  {
    $addFields: { title_split: { $split: ["$title", " "] } },
  },
  {
    $addFields: { size: { $size: "$title_split" } },
  },
  {
    $match: { size: { $eq: 1 } },
  },
  {
    $project: {
      _id: 0,
      title_split: "$title_split",
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);
