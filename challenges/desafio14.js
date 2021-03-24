db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      avgDuration: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $sort: {
      avgDuration: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: [{ $divide: ["$avgDuration", 60000] }] },
    },
  },
]);
