const StrapiModelMixin = require("./StrapiModelMixin");

class Author extends StrapiModelMixin {
  constructor({
    id = "",
    name = "",
    email = "",
    avatar = "",
    createdAt = "",
    updatedAt = "",
    publishedAt = "",
    articles = [],
    worlds = [],
  }) {
    super({
      id,
      name,
      email,
      avatar,
      createdAt,
      updatedAt,
      publishedAt,
      articles,
      worlds,
      modelPath: "authors",
      relationships: {
        worlds: "World",
      },
    });
  }
}

module.exports = Author;
