db.getCollection("air_alliances")
  .aggregate(
    {
      $unwind: "$airlines",
    },
    {
      $lookup: {
        from: "air_routes",
        localField: "airlines",
        foreignField: "airline.name",
        as: "union",
      },
    },
    {
      $unwind: "$union",
    },
    { $match: { "union.airplane": { $in: ["747", "380"] } } },
    { $group:
      {
        _id: "$name",
        totalRotas: { $sum: 1 },
      },
    },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 },
  );
