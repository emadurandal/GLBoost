import babel from "rollup-plugin-babel"

export default {
  entry: "examples/standalone/particles/app.es6.js",
  dest: "examples/standalone/particles/app.js",
  format: "umd",
  moduleName: "GLBoostParticleExample",
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
}
