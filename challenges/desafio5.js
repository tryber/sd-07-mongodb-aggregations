db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
  } },
  { $addFields: {
    num_favs: {
      $let: {
        vars: {
          actors: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
        },
        in: { $setIntersection: ["$$actors", "$cast"] },
      },
    },
  } },
  { $match: { num_favs: { $ne: null } } },
  { $addFields: { num_favs: { $size: "$num_favs" } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } }, { $skip: 24 }, { $limit: 1 }]);
