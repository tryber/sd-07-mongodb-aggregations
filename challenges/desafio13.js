db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lte: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      time: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: "$time",
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: [
            "$duracaoMediaEmMinutos",
            60000,
          ],
        },
      },
      _id: 0,
    },
  },
]);
