// db.air_alliances.aggregate([
//   {
//     $unwind: "$airlines",
//   },
//   {
//     $lookup: {
//       from: "air_routes",
//       let: { air_alliances: "$airlines" },
//       pipeline: [
//         {
//           $match: {
//             "airline.name": "$air_alliances",
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             airplane: 1,
//           },
//         },
//       ],
//       as: "airplane_name",
//     },
//   },
//   {
//     $group: {
//       _id: "$airlines",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       airplaneName: 1,
//     },
//   },
// ]);
