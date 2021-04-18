const convertToMinutes = 60000;

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gt: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      substract: {
        $divide: [
          {
            $subtract: [
              "$stopTime",
              "$startTime",
            ],
          }, convertToMinutes,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      avg_time: {
        $avg: "$substract",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$avg_time",
      },
    },
  },
]);
