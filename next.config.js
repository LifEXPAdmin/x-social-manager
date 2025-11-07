/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exclude better-sqlite3 from webpack bundling (it's a native module)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('better-sqlite3');
    }
    return config;
  },
}

module.exports = nextConfig
