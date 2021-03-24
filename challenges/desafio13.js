db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: new Date("2016-03-10"),
        $lt: new Date("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      avgDuration: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: [{ $divide: ["$avgDuration", 60000] }, 0] },
    },
  },
]);
