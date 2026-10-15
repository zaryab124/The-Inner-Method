/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/download/[orderId]': ['./content_vault/**/*'],
    },
  },
};

export default nextConfig;
