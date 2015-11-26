import babel from "rollup-plugin-babel"

export default {
  entry: "src/js/glboost.js",
  dest: "build/glboost.js",
  format: "umd",
  moduleName: "GLBoost",
  plugins: [babel()]
}