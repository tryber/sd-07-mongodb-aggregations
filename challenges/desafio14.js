const minutes = 60 * 1000;
db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: { $sum: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      minutes,
    ] } } },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" },
  } },
]);
