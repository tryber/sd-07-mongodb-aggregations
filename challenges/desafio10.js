const hour = 60 * 60 * 1000;
db.getCollection("trips")
  .aggregate([
    {
      $group: {
        _id: "$usertype",
        duracaoMedia: {
          $avg:
      { $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        hour,
      ] } },
      },
    },
    {
      $sort: {
        duracaoMedia: 1,
      },
    },
    {
      $project: {
        _id: false,
        tipo: "$_id",
        duracaoMedia: { $round: ["$duracaoMedia", 2] },
      },
    },
  ]);
