db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      totalTrips: { $sum: 1 },
    },
  },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalTrips",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "trips",
      as: "result",
      let: {
        diaDaSemana: "$diaDaSemana",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$diaDaSemana", { $dayOfWeek: "$startTime" }],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ],
    },
  },
  {
    $unwind: "$result",
  },
  {
    $project: {
      nomeEstacao: "$result._id",
      total: "$result.count",
    },
  },
]);
