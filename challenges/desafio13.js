db.trips.aggregate([
  { $match: { startTime: { $gte: new ISODate("2016-03-10"), $lt: new ISODate("2016-03-11") } } },
  { $addFields: { minutes: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } },
  { $group: { _id: null, media: { $avg: "$minutes" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$media" } } },
]);
