// db.trips.findOne();

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      avg: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600 * 1000],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$avg", 2] },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
