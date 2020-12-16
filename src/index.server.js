import React from "react";
import ReactDOMServer from "react-dom/server";

const html = ReactDOMServer.renderToString(
  //renderToString -서버사이드 랜더링 할때 사용하는 함수
  <div>Hello Server Side Rendering!</div>
);

console.log(html);
