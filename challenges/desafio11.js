db.trips.aggregate([
  { $addFields: {
    dia: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dia",
    numero: { $sum: 1 },
  } },
  { $project: {
    _id: false,
    diaDaSemana: "$_id",
    total: "$numero",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
