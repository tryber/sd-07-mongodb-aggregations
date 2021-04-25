db.trips.aggregate(
  [
    {
      $match: {
        startTime: { $gt: ISODate("2016-03-10 00:00:00"), $lt: ISODate("2016-03-10 23:59:59") },
      },
    },
    {
      $group: {
        _id: null,
        duracaoMediaEmMinutos: {
          $avg: {
            $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
      },
    },
  ],
);
