db.trips.aggregate([
  {
    $addFields: {
      day: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: {
        day: "$day",
        station: "$startStationName",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$total",
    },
  },
]);
