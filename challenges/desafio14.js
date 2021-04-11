db.trips.aggregate([
  {
    $project:
    {
      bikeid: 1,
      trip_duration:
      {
        $divide:
        [
          { $subtract: ["$stopTime", "$startTime"] }, 60000,
        ],
      },
    },
  },
  {
    $group:
    {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$trip_duration" },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  { $limit: 5 },
  {
    $project:
    {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
]);
