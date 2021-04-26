db.trips.aggregate([
  { $project: {
    usertype: 1,
    totalHourSpent: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
  },
  },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$totalHourSpent" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
