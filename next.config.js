/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
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
          sourceMaps: false
        },
      },
    });
    return config;
  }
};

module.exports = nextConfig;
