db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracao: {
        $avg: {
          $sum: {
            $divide: [
              { $subtract: ["$stopTime", "$startTime"] }, 60000,
            ],
          },
        },
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      _id: false,
      duracaoMedia: { $ceil: "$duracao" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
]);
