db.movies.aggregate([
  { $addFields: {
    title_split: { $split: ["$title", " "] },
    qty: { $size: { $split: ["$title", " "] } } },
  },
  { $match: { qty: 1 } },
  { $project: { _id: 0, title_split: 1 } },
  { $sort: { title_split: 1 } },
]);
