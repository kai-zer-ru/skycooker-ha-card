import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/skycooker-ha-card.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: false,
    entryFileNames: 'skycooker-ha-card.js',
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    json(),
    typescript({
      experimentalDecorators: true,
    }),
  ],
};