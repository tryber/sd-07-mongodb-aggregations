db.trips.aggregate([
  {
    $addFields: {
      dia: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      dia: { $eq: 5 },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      qtd: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$qtd",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]).pretty();
