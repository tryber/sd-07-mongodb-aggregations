db.trips.aggregate([
  {
    $addFields: {
      tripTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  { $group: { _id: "$bikeid", avgTime: { $avg: "$tripTime" } } },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$avgTime" },
    },
  },
]);
