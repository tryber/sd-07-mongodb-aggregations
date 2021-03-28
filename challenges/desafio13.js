db.trips.aggregate([
  {
    $match: {
      $and: [
        { startTime: { $gte: ISODate("2016-03-10T00:00:00Z") } },
        { startTime: { $lt: ISODate("2016-03-10T23:59:59Z") } },
      ],
    },
  },
  {
    $addFields: { duration: { $subtract: ["$stopTime", "$startTime"] } },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duration" },
    },
  },
  {
    $addFields: { duracaoMediaEmMinutos: { $divide: ["$duracaoMediaEmMinutos", 60000] } },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos", 0] },
    },
  },
]);
