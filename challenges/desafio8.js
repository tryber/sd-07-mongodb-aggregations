db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline_alliance: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $or: [
                  { airplane: { $eq: "747" } },
                  { airplane: { $eq: "380" } },
                ],
              },
              {
                $expr: {
                  $eq: ["$airline.name", "$$airline_alliance"],
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            src_airport: 0,
            dst_airport: 0,
            codeshare: 0,
            stops: 0,
          },
        },
      ],
      as: "rotas",
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      rotas: { $size: "$rotas" },
    },
  },
  {
    $match: {
      rotas: { $gte: 1 },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$rotas" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
