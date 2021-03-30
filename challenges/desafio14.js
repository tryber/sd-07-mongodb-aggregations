db.trips.aggregate([
  { $group: { _id: "$bikeid", duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", 60000] } } } },
  { $sort: { duracaoMediaEmMinutos: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: "$duracaoMediaEmMinutos" } },
]);
