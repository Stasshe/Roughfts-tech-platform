const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  assetPrefix: isProd ? 'https://roughfts-tech-platform.onrender.com/' : '',
  images: {
    unoptimized: true,
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
    }
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
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
