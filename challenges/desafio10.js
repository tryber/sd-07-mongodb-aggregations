db.trips.aggregate([
  {
    $match: {
      usertype: { $nin: [""] },
    },
  },

  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },

  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
    },
  },

  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
