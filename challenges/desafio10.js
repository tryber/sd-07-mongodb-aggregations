// Ref: https://cursos.alura.com.br/forum/topico-uso-do-substract-138759

const convertToHours = 3600000;

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
          }, convertToHours,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      avg_time: {
        $avg: "$substract",
      },
    },
  },
  {
    $sort: {
      avg_time: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$avg_time", 2] },
    },
  },
]);
