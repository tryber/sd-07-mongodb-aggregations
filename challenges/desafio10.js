db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: ["$duracaoMedia", 1000 * 60 * 60],
          },
          2,
        ],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
