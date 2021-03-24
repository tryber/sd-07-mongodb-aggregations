db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $unwind: "$airline.name" },
  { $group: {
    _id: "$airline.name",
    totalRotas: { $sum: 1 },
  } },
  { $project: {
    _id: 1,
    totalRotas: 1,
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
