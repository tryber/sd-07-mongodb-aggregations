// -------------------------
// sempre tenha esses caras aqui para ajudar na visualização
// db.air_airlines.findOne()
// db.air_alliances.findOne()
// db.air_routes.findOne()
// db.trips.findOne()

// Olhe sempre no trybe cheat sheets e vá montando os bloquinhos

db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    },
  },
  // {$limit: 2}, // resolva o problema para poucos para depois ver como avançar
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $match: {
      _id: { $not: { $eq: [] } },
      // _id: {$exists: 1} // seria mais fácil
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
  { $unwind: "$_id" },
]);
