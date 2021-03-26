const convertMillisegundosMinutos = 1 * 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      tempoMedio: {
        $avg: {
          $subtract: [
            "$stopTime", "$startTime",
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: [
            "$tempoMedio", convertMillisegundosMinutos,
          ],
        },
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
