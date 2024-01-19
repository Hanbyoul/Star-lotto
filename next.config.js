const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
