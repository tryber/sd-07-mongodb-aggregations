db.trips.aggregate(
  {
    $addFields: {
      duracao: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracao_avg: {
        $avg: "$duracao",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      media: {
        $divide: ["$duracao_avg", 3600000],
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: 1,
      duracaoMedia: {
        $round: ["$media", 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
);
