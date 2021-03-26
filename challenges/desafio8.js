db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  { $match: { $or: [{ airplane: "747" }, { airplane: "380" }] } },
  { $addFields: { allianceName: "$alliance.name" } },
  { $unwind: "$allianceName" },
  { $group: { _id: "$allianceName", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
