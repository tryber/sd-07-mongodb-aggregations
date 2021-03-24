const minuteConvert = 60000;

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      averageTime: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, minuteConvert],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$averageTime" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
