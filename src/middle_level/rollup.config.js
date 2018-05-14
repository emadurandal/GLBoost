import flow from 'rollup-plugin-flow';

export default {
  entry: 'src/middle_level/glboost_include.js',
  dest: 'build/glboost.js',
  format: 'umd',
  plugins: [ flow() ],
  moduleName: 'GLBoost',
}
