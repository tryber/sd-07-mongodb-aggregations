db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMediaEmMinutos: {
      $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] },
    },
  } },
  { $sort: { duracaoMediaEmMinutos: -1 } },
  { $limit: 5 },
  { $project: {
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
    _id: 0,
  } },
]);
