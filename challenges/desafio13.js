db.trips.aggregate([
  {
    $match: {
      $and: [
        { $expr: { $eq: [{ $dayOfMonth: "$startTime" }, 10] } },
        { $expr: { $eq: [{ $month: "$startTime" }, 3] } },
        { $expr: { $eq: [{ $year: "$startTime" }, 2016] } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
