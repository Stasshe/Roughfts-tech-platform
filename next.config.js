module.exports = {
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
};
