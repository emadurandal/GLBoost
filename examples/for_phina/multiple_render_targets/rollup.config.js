import babel from "rollup-plugin-babel"

export default {
  entry: "examples/for_phina/multiple_render_targets/main.js",
  dest: "examples/for_phina/multiple_render_targets/main-es5.js",
  format: "umd",
  moduleName: "GLBoostMultipleRenderTargetsExample",
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
}
