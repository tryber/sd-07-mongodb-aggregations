db.trips.aggregate([
  {
    $project: {
      dayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$dayOfWeek",
      trips: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$trips",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
]);
