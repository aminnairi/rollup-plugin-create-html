# @aminnairi/rollup-plugin-create-html

## Requirements

- Node
- NPM

## Installation

```bash
npm install @aminnairi/rollup-plugin-create-html
```

## Usage

```javascript
import { createHtml } from "./sources/rollup-plugin-create-html";

export default {
  input: "sources/index.js",
  plugins: [
    createHtml({
      name: "index.html",
      path: ".",
      doctype: "<!DOCTYPE html>",
      root: {
        name: "html",
        attributes: {
          lang: "en-US"
        },
        children: [
          {
            name: "head",
            children: [
              { name: "meta", attributes: { charset: "UTF-8" } },
              { name: "meta", attributes: { name: "description", content: "description" } },
              { name: "meta", attributes: { name: "viewport", content: "width=device-width, initial-scale=1.0" } },
              { name: "title", children: ["title"] }
            ]
          },
          {
            name: "body",
            children: [
              { name: "div", attributes: { id: "root" }, children: [] },
              { name: "script", attributes: { src: "index.js", async: true, defer: true }, children: [] }
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
```

```html
<!DOCTYPE html>
<html lang='en-US'>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='description'>
    <title>title</title>
  </head>
  <body>
    <div id='root'></div>
    <script src='index.js' async defer></script>
  </body>
</html>
```

## Options

### Name

The name of the file to generate. This should not include any folder.

```javascript
import { createHtml } from "@aminnairi/rollup-plugin-create-html";

createHtml({
  name: "index.html"
});

createHtml({
  name: "404.html"
});

createHtml({
  name: "200.html"
});
```

### Path

The path to the file to generate. This should not include any file name nor absolute nor relative paths.

```javascript
import { createHtml } from "@aminnairi/rollup-plugin-create-html";

createHtml({
  path: "."
});

createHtml({
  path: "pages"
});

createHtml({
  name: "assets/html"
});
```

### Doctype

The doctype for the generated file.

```javascript
import { createHtml } from "@aminnairi/rollup-plugin-create-html";

createHtml({
  doctype: "<!DOCTYPE html>"
});

createHtml({
  doctype: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/strict.dtd">`
});
```

### Root

The HTML content of the document to generate.

```javascript
import { createHtml } from "@aminnairi/rollup-plugin-create-html";

createHtml({
  name: "index.html",
  path: ".",
  doctype: "<!DOCTYPE html>",
  root: {
    name: "html"
  }
});
```

```html
<!DOCTYPE html>
<html>
```

```javascript
createHtml({
  name: "index.html",
  path: ".",
  doctype: "<!DOCTYPE html>",
  // <!DOCTYPE html><html></html>
  root: {
    name: "html",
    children: []
  }
});
```

```html
<!DOCTYPE html>
<html></html>
```

```javascript
createHtml({
  name: "index.html",
  path: ".",
  doctype: "<!DOCTYPE html>",
  // <!DOCTYPE html><html lang='en-US' dir='ltr'></html>
  root: {
    name: "html",
    attributes: {
      lang: "en-US",
      dir: "ltr"
    },
    children: []
  }
});
```

```html
<!DOCTYPE html>
<html lang='en-US' dir='ltr'></html>
```

```javascript
createHtml({
  name: "index.html",
  path: ".",
  doctype: "<!DOCTYPE html>",
  // <!DOCTYPE html><html>HTML</html>
  root: {
    name: "html",
    children: [
      "HTML"
    ]
  }
});
```

```html
<!DOCTYPE html>
<html>
  HTML
</html>
```

```javascript
createHtml({
  name: "index.html",
  path: ".",
  doctype: "<!DOCTYPE html>",
  // <!DOCTYPE html><html><body><script src='index.js' async></script></body></html>
  root: {
    name: "html",
    children: [
      {
        name: "body",
        children: [
          {
            name: "script",
            attributes: {
              src: "index.js",
              async: true,
              defer: false
            },
            children: []
          }
        ]
      }
    ]
  }
});
```

```html
<!DOCTYPE html>
<html>
  <body>
    <script src='index.js' async></script>
  </body>
</html>
```
