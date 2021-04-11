db.trips.aggregate([
  {
    $group:
    {
      _id:
      {
        $dayOfWeek: "$startTime",
      },
      total: { $sum: 1 },
    }, // feito com ajuda do pr do @rafaelmguimaraes
  },
  {
    $sort:
    {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project:
    {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
]);
