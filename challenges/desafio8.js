db.air_routes.aggregate(
  [
    {
      $match: {
        airplane: { $in: ["747", "380"] },
      },
    },
    {
      $group: {
        _id: "$airline.name",
        totalVoos: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "air_alliances",
        localField: "_id",
        foreignField: "airlines",
        as: "table_alliances",
      },
    },
    {
      $unwind: "$table_alliances",
    },
    {
      $group: {
        _id: "$table_alliances.name",
        totalRotas: { $sum: "$totalVoos" },
      },
    },
    {
      $sort: { totalRotas: -1 },
    },
    {
      $limit: 1,
    },
  ],
);
