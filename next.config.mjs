const { NEXT_PUBLIC_BASE_PATH } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: NEXT_PUBLIC_BASE_PATH,
  staticPageGenerationTimeout: 1000
};

export default nextConfig;
