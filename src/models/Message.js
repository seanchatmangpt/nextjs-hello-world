const StrapiModelMixin = require("./StrapiModelMixin");

class Message extends StrapiModelMixin {
  constructor({
    id = "",
    content = "",
    createdAt = "",
    updatedAt = "",
    publishedAt = "",
  } = {}) {
    super({
      id,
      content,
      createdAt,
      updatedAt,
      publishedAt,
      modelPath: "messages",
    });
    this.content = content;
  }
}

module.exports = Message;
