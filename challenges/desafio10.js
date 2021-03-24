db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      avgDuration: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $sort: {
      avgDuration: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$avgDuration", 3600000] }, 2] },
    },
  },
]);
