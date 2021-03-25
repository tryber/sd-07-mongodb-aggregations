db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "rotas",
  } },
  { $unwind: "$rotas" },
  { $match: {
    $or: [
      { "rotas.airplane": { $eq: "747" } },
      { "rotas.airplane": { $eq: "380" } },
    ],
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
