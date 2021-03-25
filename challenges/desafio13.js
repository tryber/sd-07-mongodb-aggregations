db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.0Z"),
        $lte: ISODate("2016-03-10T23:59:59.0Z"),
      },
    },
  },
  {
    $addFields: {
      duracaoEmMinutos: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
