db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "air_route",
    },
  },
  { $unwind: "$air_route" },
  {
    $match: {
      $or: [
        { "air_route.airplane": { $eq: "747" } },
        { "air_route.airplane": { $eq: "380" } },
      ],
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
