const minuteConvert = 60000;

db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
    },
  },
  {
    $group: {
      _id: null,
      averageTime: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, minuteConvert],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$averageTime" },
    },
  },
]);
