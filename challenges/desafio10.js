db.trips.aggregate(
  [
    {
      $match: {
        startTime: {
          $exists: true,
        },
        stopTime: {
          $exists: true,
        },
      },
    },

    {
      $group: {
        _id: "$usertype",
        duracaoMedia: {
          $avg: {
            $subtract: [
              { $hour: "$stopTime.date" }, { $hour: "$startTime.date" }],
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: {
          $round: ["$duracaoMedia", 2],
        },
      },
    },
  ],
);
