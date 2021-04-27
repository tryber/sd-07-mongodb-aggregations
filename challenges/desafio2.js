db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: {
        $not: { $in: ["Crime", "Horror"] },
      },
      // $or: [
      //   {rated: "PG"},
      //   {rated: "G"},
      // ], // esse codigo passa no req 1, mas no 2 so passa o da linha 12
      rated: { $in: ["PG", "G"] },
      $and: [
        { languages: { $in: ["English"] } },
        { languages: { $in: ["Spanish"] } },
      ],
    },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      _id: 0,
    },
  },
]);
