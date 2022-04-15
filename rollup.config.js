import { terser } from "rollup-plugin-terser";
import { external } from "@aminnairi/rollup-plugin-external";

export default {
  input: "sources/rollup-plugin-create-html.js",
  plugins: [
    external(),
    terser()
  ],
  output: {
    file: "build/rollup-plugin-create-html.js",
    format: "cjs"
  }
}
