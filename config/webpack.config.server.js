/** 웹팩 기본설정 */
const paths = require("./paths");

module.exports = {
  mode: "production", //모드(옵션실행 환경)설정
  entry: paths.ssrIndexJs, //엔트리 경로
  target: "node", //실행환경
  output: {
    path: paths.ssrBuild, //빌드 경로
    fileName: "server.js", //파일 이름
    chunkFilename: "js/[name].chuck.js", //청크파일 이름
    publicPath: paths.servedPath, //정적파일이 제공될 경로
  },
};
