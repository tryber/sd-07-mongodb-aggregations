//* Usei como referência o PR do amigo Alexandre Faustino. PR: https://github.com/tryber/sd-07-mongodb-aggregations/pull/96/commits/ebd8e8fb3a9eee159f93936609610cc6b82d23b4
db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        alliances_airlines: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$alliances_airlines"],
            },
          },
        },
      ],
      as: "dados",
    },
  },
  {
    $unwind: "$dados",
  },
  {
    $match: {
      "dados.airplane": {
        $in: ["747", "380"],
      },
    },
  },
  {
    $group: {
      _id: "$name",
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
]);
