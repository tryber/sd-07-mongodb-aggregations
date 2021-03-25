db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      let: {
        companhia: "$airline.name",
      },
      pipeline: [
        {
          $match: {
            $expr:
            {
              $in: ["$$companhia", "$airlines"],
            },
          },
        },
      ],
      as: "voos",
    },
  },
  {
    $match: {
      "voos.name": { $exists: 1 },
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $group: {
      _id: "$voos.name",
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
  {
    $unwind: "$_id",
  },
]);
