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
]);
