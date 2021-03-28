db.trips.aggregate([
  { $match: { usertype: { $exists: true, $ne: "" } } },
  {
    $group: {
      _id: "$usertype",
      duracao_media: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $group: {
      _id: {
        tipo: "$_id",
        duracao_media_em_horas: { $divide: ["$duracao_media", 3600000] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id.tipo",
      duracaoMedia: { $round: ["$_id.duracao_media_em_horas", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
