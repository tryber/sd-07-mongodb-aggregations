db.trips.aggregate([
  {
    $match: {
      bikeid: { $exists: true, $ne: "" },
      startTime: { $exists: true, $ne: "" },
      stopTime: { $exists: true, $ne: "" },
    },
  },
  {
    $addFields: {
      duracao: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$duracaoMedia", 1000 * 60],
        },
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
