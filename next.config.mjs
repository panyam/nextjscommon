/** @type {import('next').NextConfig} */

const finalConfig = {
  // Append the default value with md extensions
  experimental: {
    externalDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  distDir: "build",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

// module.exports = withBundleAnalyzer(nextConfig);
// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
export default finalConfig; // module.exports = finalConfig;
