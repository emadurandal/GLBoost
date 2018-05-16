import flow from 'rollup-plugin-flow';
//import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'src/middle_level/glboost_include.js',
  output: {
    file: 'build/glboost.js',
    name: 'GLBoost',
    sourcemap: true,
    format: 'umd',

  },
  plugins: [ flow() ]
}
