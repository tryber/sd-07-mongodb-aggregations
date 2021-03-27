//  https://stackoverflow.com/questions/48369419/how-to-subtract-two-date-time-in-mongodb

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [{
            $subtract: ["$stopTime", "$startTime"],
          }, 3600000],
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

  {
    $sort: { duracaoMedia: 1 },
  },
]);
