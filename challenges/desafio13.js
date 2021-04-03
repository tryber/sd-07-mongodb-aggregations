db.trips.aggregate([
  { $addFields: { duration: { $subtract: ["$stopTime", "$startTime"] } } },
  { $addFields: { percent: { $divide: ["$duration", 60000] } } },
  { $match: { startTime: { $gt: ISODate("2016-03-10T00:00:00Z"), $lt: ISODate("2016-03-10T23:59:59Z") } } },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: "$percent" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);
