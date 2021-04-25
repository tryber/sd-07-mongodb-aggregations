db.trips.aggregate(
  [
    {
      $addFields: {
        duracao_media: {
          $round: [{
            $divide: [
              { $subtract: ["$stopTime", "$startTime"] },
              { $divide: [86400000, 24] },
            ],
          }, 2],
        },
      },
    },
    {
      $group: {
        _id: "$usertype",
        duracao_media: { $avg: "$duracao_media" },
      },
    },
    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: ["$duracao_media", 2] },
      },
    },
    {
      $sort: { duracaoMedia: 1 },
    },
  ],
);
