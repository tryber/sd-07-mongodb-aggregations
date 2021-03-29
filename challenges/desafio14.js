const convert = 1000 * 60;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      media: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: [{ $divide: ["$media", convert] }] },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
