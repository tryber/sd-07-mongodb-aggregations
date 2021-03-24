db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    averageDuration: { $avg: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000],
    } },
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: { $round: ["$averageDuration", 2] },
    _id: 0,
  } },
  { $sort: { duracaoMedia: 1 } },
]);
