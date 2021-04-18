const convertToMinutes = 60000;

db.trips.aggregate([
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
      _id: "$bikeid",
      avg_time: {
        $avg: "$substract",
      },
    },
  },
  {
    $sort: {
      avg_time: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$avg_time",
      },
    },
  },
]);
