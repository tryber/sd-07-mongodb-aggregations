db.trips.aggregate([
  {
    $addFields: {
      duration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      durationAvg: {
        $avg: "$duration",
      },
    },
  },
  {
    $project: {
      _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$durationAvg", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
