db.trips.aggregate([
  {
    $match: {
      usertype: { $exists: true },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracao: {
        $avg: {
          $subtract: [
            "$stopTime",
            "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$duracao", 60 * 60 * 1000] }, 2,
        ],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
