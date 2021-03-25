const imdbRatingGte7 = { "imdb.rating": { $gte: 7 } };
const genresNotCrimeHorror = { genres: { $nin: ["Crime", "Horror"] } };
const ratedWithPgOrG = { rated: { $in: ["PG", "G"] } };
const languageEnAndSp = {
  $and: [{ languages: "English" }, { languages: "Spanish" }],
};

db.movies.aggregate([
  {
    $match: {
      $and: [
        imdbRatingGte7,
        genresNotCrimeHorror,
        ratedWithPgOrG,
        languageEnAndSp,
      ],
    },
  },
  {
    $project: {
      _id: 0,
      title: 1,
      rated: 1,
      "imdb.rating": 1,
      "imdb.votes": 1,
      year: 1,
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  { $sort: { ano: -1, notaIMDB: -1 } },
]);
