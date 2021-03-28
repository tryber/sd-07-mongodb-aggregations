db.air_routes.aggregate([
  {
    $match:
      { airplane: { $in: ["747", "380"] } },
  },
  {
    $group: {
      _id: "$airline.name",
      rotas: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "_id",
      foreignField: "airlines",
      as: "empresas",
    },
  },
  { $unwind: "$empresas" },
  {
    $group: {
      _id: "$empresas.name",
      totalRotas: { $sum: "$rotas" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
