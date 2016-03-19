import babel from "rollup-plugin-babel"

export default {
  entry: "examples/standalone/custom_shader/app.es6.js",
  dest: "examples/standalone/custom_shader/app.js",
  format: "umd",
  moduleName: "GLBoostCustomShaderExample",
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
}
