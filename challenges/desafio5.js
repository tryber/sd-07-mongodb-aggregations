/*
stackoverflow.com/questions/24201120/
mongodb-the-argument-to-size-must-be-an-array-but-was-of-type-eoo-missing

https://docs.mongodb.com/manual/reference/operator/aggregation/ifNull/index.html
*/

const favoriteActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $addFields: {
      num_favs: { $size: { $ifNull: [{ $setIntersection: ["$cast", favoriteActors] }, []] } },
    },
  },
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { _id: 0, title: 1 } },
]);
