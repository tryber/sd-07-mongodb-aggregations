db.trips.aggregate([
  {
    $addFields: {
      startDay: { $dayOfMonth: "$startTime" },
      startMonth: { $month: "$startTime" },
      startYear: { $year: "$startTime" },
      duration: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $match: {
      startDay: 10,
      startMonth: 3,
      startYear: 2016,
    },
  },
  {
    $group: {
      _id: null,
      avg: { $avg: "$duration" },

    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$avg" },
    },
  },
]);
