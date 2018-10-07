import babel from 'rollup-plugin-babel';
import flow from 'rollup-plugin-flow';

export default {
  input: 'src/middle_level/glboost_include.js',
  output: {
    file: 'build/glboost.js',
    name: 'GLBoost',
    format: 'umd'
  },
  plugins: [
    flow(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      // use recommended babel-preset-env without es modules enabled
      // and with possibility to set custom targets e.g. { node: '8' }
      presets: [['env', {
        modules: false,
        plugins: ['babel-plugin-rewire']
      }]],
      // solve a problem with spread operator transpilation https://github.com/rollup/rollup/issues/281
      plugins: [
        'external-helpers',
        //'babel-plugin-transform-object-rest-spread'
      ],
      // removes comments from output
      comments: false,
      externalHelpers: true
    })
  ]
}
