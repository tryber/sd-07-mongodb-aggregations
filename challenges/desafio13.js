db.trips.aggregate([
  {
    $match: {
      $and: [
        {
          startTime: { $gte: ISODate("2016-03-10T00:00:00Z") },
        },
        {
          startTime: { $lte: ISODate("2016-03-10T23:59:59Z") },
        },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      duracao: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $project: {
      _id: 0,
      duracao: { $divide: ["$duracao", 60 * 1000] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
