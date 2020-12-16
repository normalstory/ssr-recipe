import React from "react";
import ReactDOMServer from "react-dom/server";

/**서버사이드 랜더링 */
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path"; //+정적파일 제공하기

//++빌드 후 정적파일참조
import fs from "fs";
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);
const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
  .map((key) => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
  .join(""); // 합침

function createPage(root, tags) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      <link href="${manifest.files["main.css"]}" rel="stylesheet" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      <script src="${manifest.files["runtime-main.js"]}"></script>
      ${chunks}
      <script src="${manifest.files["main.js"]}"></script>
    </body>
    </html>
      `;
}

const app = express();

//서버사이드 랜더링을 처리할 핸들러 함수
const severRender = (req, res, next) => {
  //404를 띄우지않고 서버사이드 랜더링 수행
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx);
  res.send(createPage(root)); //결과물 응답 //++빌드 후 정적파일참조
};

//+정적파일 제공하기
const serve = express.static(path.resolve("./build"), {
  index: false, // '/경로'에서 index.html을 보여주지 않기 위한 옵션
});

app.use(serve); //+정적파일 제공하기, 순서가 중요. severRender위에 있어야함
app.use(severRender);

app.listen(5000, () => {
  //해당 포트로 서버가동
  console.log("running on http://localhost:5000");
});

// const html = ReactDOMServer.renderToString(
//   //renderToString -서버사이드 랜더링 할때 사용하는 함수
//   <div>Hello Server Side Rendering!</div>
// );
// console.log(html);
