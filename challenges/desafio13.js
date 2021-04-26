//* Usei como referência o PR do amigo Alexandre Faustino. PR: https://github.com/tryber/sd-07-mongodb-aggregations/pull/96/commits/0007ebff895873f12c065a1569702b87bf453822
db.trips.aggregate([
  {
    $match: {
      startTime: {
        $exists: true,
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
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
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos",
      },
    },
  },
]);
