db.trips.aggregate([
  {
    $addFields: {
      duracaoEmMinutos: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      numeroViagens: { $sum: 1 },
      duracaoTotal: { $sum: "$duracaoEmMinutos" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$duracaoTotal", "$numeroViagens"] } },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
]);
