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
      _id: "$bikeid",
      media: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      media_sem_aredondar: {
        $divide: ["$media", 60000],
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$media_sem_aredondar",
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
