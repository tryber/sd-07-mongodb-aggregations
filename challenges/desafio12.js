db.trips.aggregate([
  { $addFields: {
    dia: { $dayOfWeek: "$startTime" },
  } },
  { $match: {
    dia: 5,
  } },
  { $group: {
    _id: "$startStationName",
    numero: { $sum: 1 },
  } },
  { $project: {
    _id: false,
    nomeEstacao: "$_id",
    total: "$numero",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
