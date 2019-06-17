// start app
console.log("starting app file");

require("@babel/register")({
  extends: "./.babelrc",
  ignore: [/node_modules/]
});
require(`./src/index.js`);
