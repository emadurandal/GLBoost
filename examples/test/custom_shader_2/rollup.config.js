import babel from "rollup-plugin-babel"

export default {
  entry: "examples/standalone/custom_shader_2/app.es6.js",
  dest: "examples/standalone/custom_shader_2/app.js",
  format: "umd",
  moduleName: "GLBoostCustomShader2Example",
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
}
