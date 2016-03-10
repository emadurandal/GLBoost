import babel from "rollup-plugin-babel"

export default {
  entry: "examples/for_phina/multiple_render_targets/app.es6.js",
  dest: "examples/for_phina/multiple_render_targets/app.js",
  format: "umd",
  moduleName: "GLBoostMultipleRenderTargetsExample",
  plugins: [babel()]
}
