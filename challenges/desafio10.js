const convertToHours = 60 * 60 * 1000;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            convertToHours,
          ],
        },
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
