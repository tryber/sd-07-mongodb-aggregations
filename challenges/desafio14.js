db.trips.aggregate(
  [
    {
      $group: {
        _id: "$bikeid",
        duracaoMediaEmMinutos: {
          $avg: {
            $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
          },
        },
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
  ],
);
