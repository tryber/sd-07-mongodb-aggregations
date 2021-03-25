const actors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
const countryEua = { countries: { $in: ["USA"] } };
const tomatoesViewerRatingGte3 = { "tomatoes.viewer.rating": { $gte: 3 } };
const fieldCast = { cast: { $exists: true } };

db.movies.aggregate([
  { $match: { $and: [countryEua, tomatoesViewerRatingGte3, fieldCast] } },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: [actors, "$cast"] } },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
]);
