const divider = 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            divider,
          ],
        },
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: ["$duracaoMedia"] },
    },
  },
]);
