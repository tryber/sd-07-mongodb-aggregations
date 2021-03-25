db.trips.aggregate([
  {
    $match: {
      $or: [
        { startTime: { $gte: ISODate("2016-03-10T00:00:00Z") } },
        { startTime: { $gte: ISODate("2016-03-10T23:59:59Z") } },
      ],
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
      _id: null,
      media: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      media_sem_aredondar: {
        $divide: ["$media", 60000],
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$media_sem_aredondar" },
    },
  },
]);
