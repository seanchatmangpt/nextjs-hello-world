const StrapiModelMixin = require("./StrapiModelMixin");

class World extends StrapiModelMixin {
  constructor({
    id = "",
    guid = "",
    intro = "",
    content = "",
    createdAt = "",
    updatedAt = "",
    publishedAt = "",
    blogs = [],
    messages = [],
    author = {},
  } = {}) {
    super({
      id,
      intro,
      blogs,
      messages,
      author,
      createdAt,
      updatedAt,
      publishedAt,
      modelPath: "worlds",
      relationships: {
        blogs: "Blog",
        messages: "Message",
        author: "Author",
      },
    });
  }
}

module.exports = World;
