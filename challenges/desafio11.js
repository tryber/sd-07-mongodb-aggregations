db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      qtde: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      qtde: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$qtde",
    },
  },
]);
