db.trips.aggregate([
  {
    $addFields: {
      onlyDate: { $dateToString: { format: "%d/%m/%Y", date: "$startTime" } },
    },
  },
  { $match: { onlyDate: "10/03/2016" } },
  {
    $group: {
      _id: "$onlyDate",
      duracaoMediaEmMinutos: {
        $avg: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },

  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: { $divide: ["$duracaoMediaEmMinutos", 60000] },
      },
    },
  },
]);
