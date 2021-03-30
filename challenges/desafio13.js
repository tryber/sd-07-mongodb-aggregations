db.getCollection("trips")
  .aggregate([
    {
      $match: {
        startTime: {
          $gte: ISODate("2016-03-10T00:00:00Z"),
          $lte: ISODate("2016-03-10T23:59:00Z"),
        },
      },
    },
    {
      $group: {
        _id: null,
        duracao: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracao", 60000] } },
      },
    },
  ]);
