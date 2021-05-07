const convertToMinutes = 60 * 1000;

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            convertToMinutes,
          ],
        },
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: ["$duracaoMedia"] },
      _id: 0,
    },
  },
]);
