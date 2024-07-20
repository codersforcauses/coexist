import os from "node:os";

import isInsideContainer from "is-inside-container";
import removeImports from 'next-remove-imports';

const isWindowsDevContainer = () =>
  os.release().toLowerCase().includes("microsoft") && isInsideContainer();

const baseConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    if (isWindowsDevContainer()) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }


    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};


const finalConfig = removeImports(baseConfig);

export default finalConfig;
