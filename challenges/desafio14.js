db.trips.aggregate([
  { $addFields: {
    soma: { $divide: [
      { $subtract: [
        "$stopTime", "$startTime",
      ] }, 60000,
    ],
    } } },
  { $group: {
    _id: "$bikeid",
    resultado: { $avg: { $sum: "$soma" } },
  } },
  { $project: {
    bikeId: "$_id",
    _id: false,
    duracaoMedia: { $ceil: "$resultado" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
