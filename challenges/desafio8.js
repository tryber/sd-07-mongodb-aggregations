db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["380", "747"] },
    },
  },
  {
    $group: {
      _id: "$airline.name",
      airplanes: { $push: "$airplane" },
    },
  },
  {
    $project: {
      _id: 0,
      airline: "$_id",
      routesByAirline: { $size: "$airplanes" },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { alnName: "$airline" },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$$alnName", "$airlines"],
            },
          },
        },
      ],
      as: "alliance",
    },
  },
  {
    $group: {
      _id: { $arrayElemAt: ["$alliance.name", 0] },
      totalRotas: { $sum: "$routesByAirline" },
    },
  },
  {
    $match: {
      _id: { $ne: null },
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
