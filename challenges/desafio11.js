db.trips.aggregate([
  { $match: { startTime: { $exists: true, $ne: "" } } },
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$diaDaSemana", qtd: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$qtd" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
