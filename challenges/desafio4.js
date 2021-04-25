db.getCollection("movies")
  .aggregate(
    { $project:
      {
        _id: 0,
        title_split:
          { $split: ["$title", " "] },
        tamanho: { $size: { $split: ["$title", " "] } },
      },
    },
    { $match: { tamanho: { $eq: 1 } } },
    { $project: { title_split: 1 } },
    { $sort: { title_split: 1 } },
  );
