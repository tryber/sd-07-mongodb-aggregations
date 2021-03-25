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
      media_de_duracao: {
        $avg: "$duracao",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      media_sem_aredondar: {
        $divide: ["$media_de_duracao", 3600000],
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: 1,
      duracaoMedia: {
        $round: ["$media_sem_aredondar", 2],
      },
    },
  },
]);
