db.trips.aggregate([{
  $addFields: {
    dia: {
      $dayOfWeek: "$startTime",
    },
  },
},
{
  $group: {
    _id: {
      estacao: "$startStationName",
      diaSemana: "$dia",
    },
    qtde: { $sum: 1 },
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
    nomeEstacao: "$_id.estacao",
    total: "$qtde",
  },
},
]);
