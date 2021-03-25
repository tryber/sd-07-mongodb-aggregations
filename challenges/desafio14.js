db.trips.aggregate([
  {
    $addFields: {
      time: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$time" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$duracaoMedia", 60000] } },
      _id: 0,
    },
  },
]);
