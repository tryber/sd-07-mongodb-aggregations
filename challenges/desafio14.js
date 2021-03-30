db.trips.aggregate([
  { $addFields: { minutes: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } },
  { $group: { _id: "$bikeid", media: { $avg: "$minutes" } } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$media" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
