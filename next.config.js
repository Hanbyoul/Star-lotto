/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  env: {
    NEXTAUTH_SECRET: "asd!@#ASD!@3123",
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
