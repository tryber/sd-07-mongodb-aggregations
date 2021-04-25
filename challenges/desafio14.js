db.trips.aggregate([
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
      _id: "$bikeid",
      duracaoMediaEmMinutos: { $avg: "$duracao" },
    },
  },
  {
    $sort: { duracaoMediaEmMinutos: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
