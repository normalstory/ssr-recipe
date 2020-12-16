import React from "react";
import ReactDOMServer from "react-dom/server";

/**서버사이드 랜더링 */
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path"; //+정적파일 제공하기

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
  res.send(root); //결과물 응답
};

const serve = express.static(path.resolve("./build"), {
  index: false, // '/경로'에서 index.html을 보여주지 않기 위한 옵션
});

app.use(serve); //순서가 중요. severRender위에 있어야함
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
