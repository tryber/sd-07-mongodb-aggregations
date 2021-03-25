db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $project: {
      dia: {
        $multiply: [
          {
            $abs: {
              $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 86400000],
            },
          },
          1440,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      media: { $avg: "$dia" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: ["$media"] },
    },
  },
]);
