// referência do ISODate: https://www.tutorialspoint.com/how-to-work-date-query-with-isodate-in-mongodb
// referência do divide: https://github.com/tryber/sd-07-mongodb-aggregations/blob/camila-valentim-mongodb-aggregations/challenges/desafio13.js

db.trips.aggregate([
  {
    $addFields: {
      duracao: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lt: ISODate("2016-03-11T00:00:00Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: "$duracao",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMedia",
      },
    },
  },
]);
