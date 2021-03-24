const hourConvert = 3.6e+6;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      averageTime: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, hourConvert],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$averageTime", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
