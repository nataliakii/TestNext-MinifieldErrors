/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_LOCAL_API_BASE_URL: "http://localhost:3001",
    NEXT_PUBLIC_API_BASE_URL: "https://tokatiallo.vercel.app",
  },
};

export default nextConfig;
