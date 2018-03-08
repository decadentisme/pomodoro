import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const devServerPlugins = () => process.env.NODE_ENV === 'development' && [
  serve({
    open: true,
    port: 3000,
    contentBase: 'build/',
  }),
  livereload({
    watch: 'build',
  }),
]

export default {
  entry: './src/script.js',
  output: {
    file: './build/script.js',
    format: 'iife',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    copy({
      'src/styles.css': 'build/styles.css',
      'src/index.html': 'build/index.html',
      verbose: true,
    }),
    ...(devServerPlugins() || []),
  ],
}
