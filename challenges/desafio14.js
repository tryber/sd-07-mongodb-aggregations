db.trips.aggregate([
  {
    $project: {
      id: "$bikeid",
      minutos: {
        $multiply: [
          {
            $abs: {
              $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 86400000],
            },
          },
          1440,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$id",
      min: { $avg: "$minutos" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: ["$min"] },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
