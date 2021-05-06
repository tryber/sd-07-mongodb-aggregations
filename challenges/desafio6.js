db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /^Won\s[1-9]\sOscar/, // Source: https://trybecourse.slack.com/archives/C016CCMKN9E/p1611858027304200?thread_ts=1611857007.302900&cid=C016CCMKN9E
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: {
        $max: "$imdb.rating",
      },
      menor_rating: {
        $min: "$imdb.rating",
      },
      media_rating: {
        $avg: "$imdb.rating",
      },
      desvio_padrao: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      maior_rating: true,
      menor_rating: true,
      media_rating: {
        $round: ["$media_rating", 1],
      },
      desvio_padrao: {
        $round: ["$desvio_padrao", 1],
      },
      _id: false,
    },
  },
]);
