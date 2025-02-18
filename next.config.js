//よくわからん
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
      '/about': { page: '/about' },
      '/experience': { page: '/experience' },
      '/search': { page: '/search' },
      '/works': { page: '/works' },
    };
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
          sourceMaps: false
        },
      },
    });
    return config;
  }
};

module.exports = nextConfig;