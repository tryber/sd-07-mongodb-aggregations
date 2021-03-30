db.trips.aggregate([
  { $addFields: { hours: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } } },
  { $group: { _id: "$usertype", tempo: { $avg: "$hours" } } },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$tempo", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);
