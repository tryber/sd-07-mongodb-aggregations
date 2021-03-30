db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    average_duration: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $sort: { average_duration: 1 } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: [{ $divide: ["$average_duration", 3600000] }, 2] },
  } },
]);
