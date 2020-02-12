import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'

import * as react from 'react'
import * as reactDom from 'react-dom'
import * as reactIs from 'react-is'

let client = {
  input: 'src/views/client.tsx',
  output: {
    dir: 'dist',
    format: 'iife',
  },
  plugins: [
    resolve({ browser: true }), 
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
      }
    }),
    typescript({ jsx: 'react' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser()
  ]
}

let server = {
  input: 'src/views/render.tsx',
  output: {
    dir: 'src/views/dist',
    format: 'cjs'
  },
  external: ['isomorphic-fetch'],
  plugins: [
    resolve({ browser: false, preferBuiltins: true }), 
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
      }
    }), 
    typescript({ jsx: 'react', target: 'ES2020' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ]
}

export default [ client, server ]
