import React from "react";
import ReactDOMServer from "react-dom/server";

/**서버사이드 랜더링 */
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";

const app = express();

const severRender = (req, res, next) => {
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx);
  res.send(root);
};

app.use(severRender);

app.listen(5000, () => {
  console.log("running on http://localhost:5000");
});

// const html = ReactDOMServer.renderToString(
//   //renderToString -서버사이드 랜더링 할때 사용하는 함수
//   <div>Hello Server Side Rendering!</div>
// );
// console.log(html);
