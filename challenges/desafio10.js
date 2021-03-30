// Referência do $divide: https://github.com/tryber/sd-07-mongodb-aggregations/blob/emanuelle-aggregations/challenges/desafio10.js

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            }, 3600000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
