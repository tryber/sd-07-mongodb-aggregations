db.movies.aggregate([
  { $sort: { title: 1 } },
  { $project: {
    title_split: { $split: ["$title", " "] },
    length: { $size: { $split: ["$title", " "] } },
  } },
  { $match: {
    length: { $eq: 1 },
  } },
  { $project: {
    _id: 0,
    length: 0,
  } },
]);
