const oneMinute = 1000 * 60;

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$duracaoMedia", oneMinute] } },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  { $limit: 5 },
]);
