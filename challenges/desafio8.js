db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "teste",
    },
  },
  {
    $match: {
      $and: [
        { airplane: { $in: ["747", "380"] } },
        { teste: { $gt: [{ $size: "$teste" }, 1] } },
      ],
    },
  },
  {
    $group: {
      _id: "$teste.name",
      totalRotas: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $project: {
      _id: {
        $reduce: {
          input: "$_id",
          initialValue: "",
          in: { $concat: ["$$value", "$$this"] },
        },
      },
      totalRotas: "$totalRotas",
    },
  },
  {
    $limit: 1,
  },
]);
