db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: {
        nome_empresa: "$airline.name",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$$nome_empresa", "$airlines"],
            },
          },
        },
      ],
      as: "match_voos",
    },
  },
  {
    $match: {
      "match_voos.name": { $exists: true },
    },
  },
  {
    $group: {
      _id: "$match_voos.name",
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
    $limit: 1,
  },

  {
    $unwind: "$_id",
  },
]);
