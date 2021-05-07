const challengeOne = [
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $nin: ["Crime", "Horror"] } },
        { rated: { $in: ["PG", "G"] } },
        { languages: "English" },
        { languages: "Spanish" },
      ],
    },
  },
];

db.movies.aggregate(challengeOne);
