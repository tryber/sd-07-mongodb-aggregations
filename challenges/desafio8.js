db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airlines: "$airlines", airline_name: "$name" },
    pipeline: [{ $match: { airplane: { $in: ["747", "380"] }, $expr: { $eq: ["$$airlines", "$airline.name"] } } }],
    as: "routes" } },
  { $unwind: "$routes" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
