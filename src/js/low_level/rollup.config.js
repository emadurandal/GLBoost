import flow from 'rollup-plugin-flow';

export default {
  entry: 'src/js/low_level/glboost_include.js',
  dest: 'build/glboost-low.js',
  format: 'umd',
  plugins: [ flow() ],
  moduleName: 'GLBoost',
}