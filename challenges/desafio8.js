db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { empresa: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $or: [
                    { $eq: ["$airplane", "747"] },
                    { $eq: ["$airplane", "380"] },
                  ],
                },
                {
                  $eq: ["$airline.name", "$$empresa"],
                },
              ],
            },
          },
        },
      ],
      as: "retorno",
    },
  },
  {
    $match: {
      $expr: {
        $gte: [{ $size: "$retorno" }, 1],
      },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: { $size: "$retorno" },
      },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  { $limit: 1 },
]);
