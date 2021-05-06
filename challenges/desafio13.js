db.trips.aggregate([
  {
    $match: { startTime: {
      $gte: ISODate("2016-03-10"),
      $lt: ISODate("2016-03-11"),
    } },
  },
  {
    $group: {
      _id: null,
      avgTimeMinutes: { $avg: { $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60 * 1000,
      ] } },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$avgTimeMinutes" },
      _id: 0,
    },
  },
]);
