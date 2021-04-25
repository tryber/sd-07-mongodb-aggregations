// DESENVOLVIDO COM AUXILIO DA VANESSA OLIVEIRA
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
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$count",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
