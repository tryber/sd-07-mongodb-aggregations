const challengeFour = [
  {
    $addFields: {
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
      title: 1,
    },
  },
  {
    $project: {
      title_split: 1,
      _id: 0,
    },
  },
];

db.movies.aggregate(challengeFour);
