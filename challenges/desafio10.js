db.trips.aggregate([
  { $addFields: {
    subctraction: { $subtract: ["$stopTime", "$startTime"] } },
  },
  {
    $addFields: {
      averageDuration: {
        $divide: ["$subctraction", 3.6e+6],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$averageDuration" },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$duracaoMedia", 2],
      },
    },
  },
]);
