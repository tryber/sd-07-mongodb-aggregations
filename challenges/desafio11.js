db.trips.aggregate([
  { $addFields: {
    weekDay: { $dayOfWeek: "$startTime" },
  } },
  { $group: { _id: "$weekDay", count: { $sum: 1 } } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$count",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
