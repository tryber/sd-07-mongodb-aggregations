db.air_routes.aggregate([
  { $match: {
    airplane: {
      $in: ["380", "747"],
    },
  },
  },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "alliance_info",
  },
  },
  { $unwind: "$alliance_info" },
  { $group: {
    _id: "$alliance_info.name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
