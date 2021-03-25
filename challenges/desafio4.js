// db.movies.aggregate([
//   { $addFields:  { title_split: { $split: ["$title", " "] }} },
//   { $match: { title_split: { $size: 1 } } },
//   { $unwind : "$title_split" },
//   { $sort: { title: 1 } }
// ]);

db.movies.aggregate([
  { $sort: { title: 1 } },
  { $project: { _id: false, title_split: { $split: ["$title", " "] } } },
  { $match: { title_split: { $size: 1 } } },
]);
