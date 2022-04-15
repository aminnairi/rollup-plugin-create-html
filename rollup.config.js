import { createHtml } from "./sources/rollup-plugin-create-html";

export default {
  input: "sources/index.js",
  plugins: [
    createHtml({
      name: "index.html",
      path: "assets",
      doctype: "<!DOCTYPE html>",
      root: {
        attributes: {
          lang: "en-US"
        },
        children: [
          {
            name: "head",
            children: [
              { name: "meta", attributes: { charset: "UTF-8" } },
              { name: "title", children: ["Rollup Plugin Create HTML"] }
            ]
          },
          {
            name: "body",
            children: [
              { name: "div", attributes: { id: "root" }, children: [] },
              { name: "script", attributes: { async: true, defer: true, src: "index.js" }, children: [] }
            ]
          }
        ]
      }
    })
  ],
  output: {
    file: "build/index.js",
    format: "iife"
  }
}
