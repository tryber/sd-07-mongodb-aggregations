db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
]);
