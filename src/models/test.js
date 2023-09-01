const Message = require("./Message");
const World = require("./World");
const { faker } = require("@faker-js/faker");

(async () => {
  // const msgs = await new Message().getAll();
  // const msgs =  await new Message().getAll({filters: {"id" : {"$eq" : "1"}}});
  // console.log(msgs);
  // const msg = msgs[3];
  // msg.delete();
  // const msg = new Message();
  // await msg.getOne("2");
  // msg.content = "Hello Worlds =) 123456";
  // await msg.upsert();
  // msg.content = "I was born this way.";
  // await msg.upsert();
  // console.log(msg);

  const worlds = await new World().getOne({ id: "1" });
  worlds.intro = faker.company.buzzPhrase();
  await worlds.upsert();
  const worlds2 = await new World().getOne({ id: "1" });
  // const worlds = await new World().getAll();
  // const blog = worlds[0].blogs[0];x
  // await blog.getOne({ id: blog.id });
  console.log("src/models/test.js", worlds.intro === worlds2.intro);
  console.log("test.js", JSON.stringify(worlds2, null, 2));
  // console.log("test.js", JSON.stringify(blog, null, 2));
})();
