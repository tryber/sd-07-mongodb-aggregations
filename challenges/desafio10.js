db.trips.aggregate([
  { $addFields: {
    diferenca: {
      $divide: [
        { $divide: [
          { $subtract: [
            "$stopTime", "$startTime",
          ] }, 60000,
        ] }, 60,
      ],
    },
  } },

  { $group: {
    _id: "$usertype",
    soma: { $avg: { $sum: "$diferenca" } },

  } },

  { $project: {
    tipo: "$_id",
    _id: false,
    duracaoMedia: { $round: ["$soma", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
