db.trips.aggregate([
  {
    $addFields: {
      diaDoAno: { $dayOfYear: "$startTime" },
      ano: { $year: "$startTime" },
    },
  },
  {
    $match: {
      $and: [{ diaDoAno: 69 }, { ano: 2016 }],
    },
  },
  {
    $group: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $floor: "$duracaoMediaEmMinutos" },
    },
  },
]);
