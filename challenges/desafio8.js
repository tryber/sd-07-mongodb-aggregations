db.getCollection("air_alliances")
  .aggregate([
    {
      $lookup: {
        from: "air_routes",
        localField: "airlines",
        foreignField: "airline.name",
        as: "Route",
      },
    },
    {
      $unwind: "$Route",
    },
    {
      $match: {
        "Route.airplane": { $in: ["380", "747"] },
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
