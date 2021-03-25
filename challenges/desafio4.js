const newField = { $addFields: { title_split: { $split: ["$title", " "] } } };
db.movies.aggregate([
  newField,
  { $match: { title_split: { $size: 1 } } },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  { $sort: { title_split: 1 } },
]);
