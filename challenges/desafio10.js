db.trips.aggregate([
  {
    $addFields: {
      time: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  { $group: { _id: "$usertype", media: { $avg: "$time" } } },
  {
    $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$media", 2] } },
  },
]);
