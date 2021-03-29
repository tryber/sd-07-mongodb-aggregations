const min = 60 * 1000;
db.getCollection("trips")
  .aggregate([
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
        duracaoMediaEmMinutos: {
          $avg:
      { $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        min,
      ] } },
      },
    },
    {
      $project: {
        _id: false,
        duracaoMediaEmMinutos: { $round: ["$duracaoMediaEmMinutos"] },
      },
    },
  ]);
