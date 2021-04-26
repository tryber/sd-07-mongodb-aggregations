db.trips.aggregate([
  {
    $set: {
      data: { $concat: [
        { $substr: [{ $dayOfMonth: "$startTime" }, 0, 2] }, "-",
        { $substr: [{ $month: "$startTime" }, 0, 2] }, "-",
        { $substr: [{ $year: "$startTime" }, 0, 4] },
      ] },
      totalHourSpent: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  { $match: {
    data: { $eq: "10-3-2016" },
  } },
  { $group: {
    _id: 0,
    media: {
      $avg: "$totalHourSpent" },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $round: "$media" },
  } },
]);
