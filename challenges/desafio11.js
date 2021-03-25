db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, total: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: 1 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
// db.trips.aggregate([
//   { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
//   { $group: { _id: "$startStationName", allTrips: { $sum: 1 } } },
//   { $project: { _id: 0, nomeEstacao: "$_id", total: "$allTrips" } },
//   { $sort: { total: -1 } },
//   { $limit: 1 },
// ]);
// se nao passa eh pq diadasemana e total tao na ordem trocados
