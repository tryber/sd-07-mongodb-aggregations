db.movies.aggregate([
  {
    $addFields: {
      novoTitulo: { $split: ["$title", " "] },
    },
  },
  {
    $addFields: {
      novoTituloSize: { $size: "$novoTitulo" },
    },
  },
  {
    $match: {
      $and: [
        { novoTituloSize: { $eq: 1 } },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      title_split: "$novoTitulo",
    },
  },
  {
    $sort: { title_split: 1 },
  },
]);
