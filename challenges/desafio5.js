db.getCollection("movies")
  .aggregate(
    { $match:
      { $and:
        [
          { countries: "USA" },
          { "tomatoes.viewer.rating": { $gte: 3 } },
        ],
      },
    },
    { $project:
      {
        _id: 0,
        title: 1,
        countries: 1,
        "tomatoes.viewer.rating": 1,
        cast: 1,
        fav_actors:
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
      },
    },
    { $project:
      {
        title: 1,
        cast: 1,
        "tomatoes.viewer.rating": 1,
        fav_actors: 1,
        commom:
          {
            $setIntersection: ["$cast", "$fav_actors"],
          },
      },
    },
    { $match:
      {
        $or:
          [
            { commom: { $all: ["Tom Hanks"] } },
            { commom: { $all: ["Sandra Bullock"] } },
            { commom: { $all: ["Kevin Spacey"] } },
            { commom: { $all: ["George Clooney"] } },
          ],
      },
    },
    { $project:
      {
        title: 1,
        cast: 1,
        "tomatoes.viewer.rating": 1,
        commom: 1,
        num_favs: { $size: "$commom" },
      },
    },
    { $sort:
      {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },
    { $project: { _id: 0, title: 1 } },
    { $skip: 24 },
    { $limit: 1 },
  );
