const seconds = 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      avgTime: {
        $avg: {
          $sum: {
            $divide: [
              { $subtract: ["$stopTime", "$startTime"] },
              seconds],
          },
        },
      },
    },
  },
  { $sort: { avgTime: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$avgTime" },
    },
  },
]);
