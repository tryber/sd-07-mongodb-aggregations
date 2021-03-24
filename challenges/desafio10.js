const hour = 60 * 60 * 1000;
db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $sum: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      hour,
    ] } } } } },
  { $sort: { duracaoMedia: 1 } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
]);
