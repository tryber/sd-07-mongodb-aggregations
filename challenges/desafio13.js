db.trips.aggregate([
  { $addFields: { encontrarData: { $dateToParts: { date: "$startTime" } } } },
  { $match: { $and: [
    { "encontrarData.year": 2016 }, { "encontrarData.month": 3 }, { "encontrarData.day": 10 }] } },
  { $group: { _id: null, duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", 60000] } } } },
]);
