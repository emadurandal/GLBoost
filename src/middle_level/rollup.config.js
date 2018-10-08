import flow from 'rollup-plugin-flow';

export default {
  input: 'src/middle_level/glboost_include.js',
  output: {
    file: 'build/glboost.js',
    name: 'GLBoost',
    format: 'umd'
  },
  plugins: [
    flow()
  ]
}
