/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/todos/today", permanent: true }];
  },
};

export default nextConfig;
