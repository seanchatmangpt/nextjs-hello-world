const yargs = require("yargs");
const Message = require("./models/Message");

const apiUrl = "YOUR_STRAPI_API_URL";
const apiToken = "YOUR_STRAPI_API_TOKEN";

// const options = yargs
//   .usage("Usage: -n <name>")
//   .option("n", {
//     alias: "name",
//     describe: "Your name",
//     type: "string",
//     demandOption: true,
//   }).argv;
//
// const greeting = `Hello, ${options.name}!`;
//
// message
//   .upsert({ content: greeting })
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));

(async () => {
  const message = await new Message().getOne(1);
  console.log("cli.js", message);
})();
