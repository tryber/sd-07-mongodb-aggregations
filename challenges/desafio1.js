/*
https://qastack.com.br/programming/18148166/find-document-with-array-that-contains-a-specific-value
*/

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      $or: [{ rated: "PG" }, { rated: "G" }],
      $and: [{ languages: "English" }, { languages: "Spanish" }],
    },
  },
]);
