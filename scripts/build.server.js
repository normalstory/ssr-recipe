process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

process.on("unhandledRejection", (err) => {
  throw err;
});

require("../config/env");
const fs = require("fs-extra");
const webpack = require("webpack");
const config = require("../config/webpack.config.server");
const paths = require("../config/paths");

function build() {
  console.log("Creating server build...");
  fs.emptyDirSync(paths.ssrBuild);
  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(stats.toString());
    });
  });
}

build();

// - 빌드 테스트 : node scripts/build.server.js
// - 결과물 확인 : node dist/server.js

/** package.json 수정 */
// "scripts": {
//   "start": "node scripts/start.js",
//   "build": "node scripts/build.js",
//   "test": "node scripts/test.js",
//   "start:server":"node dist/server.js",
//   "build:server":"node scripts/build.server.js"
// },
// - 빌드 테스트 : yarn build:server
// - 결과물 확인 : yarn start:server
