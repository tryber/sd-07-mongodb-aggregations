db.trips.aggregate([
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$diaDaSemana", qt: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$qt" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
