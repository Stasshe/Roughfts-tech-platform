module.exports = {
  basePath: '/portfolio',
  compiler: {
    styledComponents: true, // Styled Componentsのサポート
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'swc-loader',
        options: {
          jsc: {
            transform: {
              react: {
                runtime: 'automatic',
                useBuiltIns: true,
              },
            },
            externalHelpers: true,
          },
        },
      },
    });
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/works': { page: '/works' },
      '/404': { page: '/404' },
    };
  },
};
