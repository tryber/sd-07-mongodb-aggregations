db.trips.aggregate([
  {
    $group: {
      avg: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000] } },
      _id: "$usertype",
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$avg", 2] },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
