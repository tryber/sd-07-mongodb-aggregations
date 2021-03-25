db.trips.aggregate([
  {
    $addFields: {
      dia: { $dayOfMonth: "$startTime" },
      mes: { $month: "$startTime" },
    },
  },
  {
    $match: {
      $and: [
        { dia: { $eq: 10 } },
        { mes: { $eq: 3 } },
      ],
    },
  },
  {
    $group: {
      _id: null,
      media: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$media" },
    },
  },
]);
