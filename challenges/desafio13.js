db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
      },
    },
  },
  {
    $addFields: {
      duracao: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $divide: [86400000, 1440] },
        ],
      },
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
