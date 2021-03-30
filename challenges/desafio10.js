db.getCollection("trips")
  .aggregate([
    {
      $group: {
        _id: "$usertype",
        duracaoM: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
      },
    },
    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: [{ $divide: ["$duracaoM", 3600000] }, 2] },
      },
    },
    {
      $sort: {
        duracaoMedia: 1,
      },
    },
  ]);
