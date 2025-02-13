module.exports = {
  compiler: {
    styledComponents: true, // Styled Componentsのサポート
  },
  webpack: (config) => {
    config.resolve.extensions.push('.ts', '.tsx'); // ここを追加
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
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
  }
};
