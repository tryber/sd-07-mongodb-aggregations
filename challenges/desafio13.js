db.trips.aggregate([
  { $match: {
    $and: [
      { startTime: { $gte: ISODate("2016-03-10") } },
      { startTime: { $lt: ISODate("2016-03-11") } },
    ],
  },

  },
  { $addFields: {
    duracao: { $divide: [
      { $subtract: [
        "$stopTime", "$startTime",
      ] }, 60000,
    ],
    } } },
  { $group: {
    _id: null,
    soma: { $avg: { $sum: "$duracao" } },

  } },
  { $project: {
    _id: false,
    duracaoMediaEmMinutos: { $ceil: "$soma" },
  } },

]);
