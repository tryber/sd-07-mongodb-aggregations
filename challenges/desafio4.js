// Referência do size: https://github.com/tryber/sd-07-mongodb-aggregations/blob/carol-andrade-mongodb-aggregations/challenges/desafio4.js

db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
  {
    $limit: 8068,
  },
]);
