db.trips.aggregate([
  {
    $addFields: { duration: { $subtract: ["$stopTime", "$startTime"] } },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duration" },
    },
  },
  {
    $addFields: { duracaoMedia: { $divide: ["$duracaoMedia", 3600000] } },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
