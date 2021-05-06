db.trips.aggregate([
  {
    $addFields: {
      teste: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: "$teste",
      },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$duracaoMedia", 3600000] }, 2,
        ],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
