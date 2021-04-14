db.trips.aggregate([
  { $addFields: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $match: { dayOfWeek: 5 } },
  { $group: {
    _id: "$startStationName",
    totalViagem: { $sum: 1 },
  } },
  { $sort: { totalViagem: -1 } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$totalViagem",
  } },
  { $limit: 1 },
]);
