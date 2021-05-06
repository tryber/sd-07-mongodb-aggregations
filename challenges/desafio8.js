db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $unwind: "$alliance" },
  {
    $group: {
      totalRotas: { $sum: 1 },
      _id: "$alliance.name",
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
