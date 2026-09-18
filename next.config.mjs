/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pmnertamrhpomtnqgkqn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
