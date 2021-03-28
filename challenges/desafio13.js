db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gt: ISODate("2016-03-09T23:59:59.000Z"),
        $lt: ISODate("2016-03-11T00:00:00.000Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracao_media: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $group: {
      _id: {
        duracao_media_em_minutos: { $divide: ["$duracao_media", 60000] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$_id.duracao_media_em_minutos" },
    },
  },
]);
