db.trips.aggregate([
  {
    $addFields: { duration: { $subtract: ["$stopTime", "$startTime"] } },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duration" },
    },
  },
  {
    $addFields: { duracaoMedia: { $divide: ["$duracaoMedia", 60000] } },
  },
  { $sort: { duracaoMedia: -1 } },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $limit: 5 },
]);
