db.trips.aggregate([
  {
    $addFields: {
      tempoMin: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$tempoMin",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $limit: 5 },
]);
