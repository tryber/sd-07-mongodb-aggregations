db.trips.aggregate([
  {
    $set: {
      totalHourSpent: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      soma: { $avg: "$totalHourSpent" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$soma" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
