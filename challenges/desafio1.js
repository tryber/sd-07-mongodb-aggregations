db.movies.aggregate([
  { $match: { $and: [
    { "imdb.rating": { $gte: 7 } },
    { $nor: [{ genres: { $in: ["Crime", "Horror"] } }] },
    { rated: { $in: ["PG", "G"] } },
    { languages: { $all: ["English", "Spanish"] } },
  ] } },
]);
