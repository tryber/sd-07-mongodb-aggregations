db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $multiply: [60, 1000] },
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracao: { $avg: "$duracao" },
    },
  },
  {
    $sort: {
      duracao: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracao" },
    },
  },
]);
