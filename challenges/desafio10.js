db.trips.aggregate([
  {
    $addFields: {
      timeDifference: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            "$timeDifference",
            1000 * 60 * 60,
          ],
        },
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
