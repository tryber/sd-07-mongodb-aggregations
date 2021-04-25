db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gte: ISODate("2016-03-10") } },
        { startTime: { $lt: ISODate("2016-03-11") } },
      ],
    },
  },
  {
    $addFields: {
      duracao: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          { $multiply: [60, 1000] },
        ],
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
      duracaoMediaEmMinutos: { $ceil: "$media" },
    },
  },
]);
