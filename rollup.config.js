import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/ows.js",
    format: "esm",
    name: "ows-js"
  },
  plugins: [
    terser({
      mangle: true,
      compress: true,
      module: true
    })
  ]
};
