db.trips.aggregate([
  {
    $addFields: {
      diaD: { $dateToString: { format: "%d-%m-%Y", date: "$startTime" } },
    },
  },

  { $match: { diaD: "10-03-2016" } },

  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $round: [{ $divide: ["$duracaoMediaEmMinutos", 60000] }, 0],
      },
    },
  },
]);
