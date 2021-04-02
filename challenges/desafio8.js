db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$airline.name", "$$airline"] },
                {
                  $or: [
                    { $eq: ["$airplane", "747"] },
                    { $eq: ["$airplane", "380"] },
                  ],
                },
              ],
            },
          },
        },
        { $project: { airplane: "$airplane", airline: "$airline.name" } },
      ],
      as: "rotas",
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$rotas" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
