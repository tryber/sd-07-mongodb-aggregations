db.trips.aggregate([
  {
    $addFields: {
      duration: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avg: { $avg: "$duration" },
    },
  },
  {
    $sort: {
      avg: -1,
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$avg" },
    },
  },
  {
    $limit: 5,
  },
]);
