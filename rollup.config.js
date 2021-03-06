import commonjs       from '@rollup/plugin-commonjs'
import json           from '@rollup/plugin-json'
import nodeResolve    from '@rollup/plugin-node-resolve'
import babel          from '@rollup/plugin-babel'
import { decoObject } from '@spare/logger'
import fileInfo       from 'rollup-plugin-fileinfo'

const { name, dependencies, main, module } = require(process.cwd() + '/package.json')

console.log('Executing', name, process.cwd())
console.log('Dependencies', decoObject(dependencies || {}, { bracket: true }))

export default [
  {
    input: 'index.js',
    external: Object.keys(dependencies || {}),
    output: [
      { file: main, format: 'cjs' },  // CommonJS (for Node) build.
      { file: module, format: 'esm' }  // ES module (for bundlers) build.
    ],
    plugins: [
      nodeResolve({
        preferBuiltins: true
      }),
      commonjs({
        include: /node_modules/,
      }),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        exclude: 'node_modules/**',
        plugins: [
          ['@babel/plugin-proposal-class-properties'],
        ]
      }),
      json(),
      fileInfo()
    ]
  }
]
