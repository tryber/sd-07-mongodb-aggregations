db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              { $expr: { $eq: ["$airline.name", "$$airline"] } },
              { airplane: { $in: ["747", "380"] } },
            ],
          },
        },
      ],
      as: "airlineArray",
    },
  },
  { $unwind: "$airlineArray" },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
