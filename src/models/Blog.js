const StrapiModelMixin = require("./StrapiModelMixin");

class Blog extends StrapiModelMixin {
  constructor({
    id = "",
    createdAt = "",
    updatedAt = "",
    publishedAt = "",
    text = "",
    author = {},
    worlds = {},
    createdBy = {},
    updatedBy = {},
  } = {}) {
    super({
      id,
      createdAt,
      updatedAt,
      publishedAt,
      text,
      author,
      createdBy,
      updatedBy,
      worlds,
      modelPath: "blogs",
      relationships: {
        worlds: "World",
        author: "Author",
      },
    });
  }
}

module.exports = Blog;
