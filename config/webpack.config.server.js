/** 웹팩 기본설정 */
const paths = require("./paths");

/** 로더 설정 1*/
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent"); //for css모듈 고유 className 생성
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

/** nodeExternalsㄴ(서버 실행파일에 리액트 라이브러리 빼고 가져오기) */
const nodeExternals = require("webpack-node-externals");
const getClientEnvironment = require("./env");

/** 환경변수 주입 */
const webpack = require("webpack");
// const getClientEnviroment = require("./env");
// const publicUrl = paths.servedPath.slice(0, -1);
// const env = getClientEnviroment(publicUrl);
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: "production", //모드(옵션실행 환경)설정
  entry: paths.ssrIndexJs, //엔트리 경로
  target: "node", //실행환경
  output: {
    path: paths.ssrBuild, //빌드 경로
    filename: "server.js", //파일 이름
    chunkFilename: "js/[name].chunk.js", //청크파일 이름
    //publicPath: paths.servedPath, //정적파일이 제공될 경로
    publicPath: paths.publicUrlOrPath,
  },
  /** 로더 설정 2*/
  module: {
    rules: [
      {
        oneOf: [
          //**자바스크립트를 위한 처리, 기존 webPack.config.js를 참조해서 작성
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides"
              ),
              presets: [
                [
                  require.resolve("babel-preset-react-app"),
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },

          //**CSS를 위한 처리
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            //  exportOnlyLocals: true 옵션을 설정해야 실제 css 파일을 생성하지 않습니다.
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
          // Adds support for CSS Modules 를 위한 처리 (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          // Opt-in support for SASS  를 위한 처리 (using .scss or .sass extensions).
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                  },
                },
              },
              require.resolve("sass-loader"),
            ],
          },
          // Adds support for CSS Modules, but(+) using SASS 를 위한 처리
          // using the extension .module.scss or(+) .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
              },
              require.resolve("sass-loader"),
            ],
          },
          // url-loader를 위한 처리
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              emitFile: false, //파일을 따로 저장하지 않는 옵션
              limit: 10000, //원래 9.76kb가 넘어가면 파일을 따로 저장함 but 위 emitFile 설정이 false라 저장 안함
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // 위 설정된 확장자를 제외한 파일들은 file-loader를 사용
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false, //파일을 따로 저장하지 않는 옵션
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
  //node_modules 로드하기(서버 실행파일에 리액트 라이브러리를 포함하지 않아도 됨)
  resolve: {
    modules: ["node_modules"],
  },
  //nodeExternals(서버 실행파일에 리액트 라이브러리 빼고 가져오기)
  externals: [
    nodeExternals({
      allowlist: [/@babel/],
    }),
  ],
  //환경변수 적용
  plugins: [new webpack.DefinePlugin(env.stringified)],
};
