db.trips.aggregate([
  {
    $addFields: {
      time: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$time",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$duracaoMedia", 3600000] }, 2,
        ],
      },
      _id: 0,
    },
  },
]);
