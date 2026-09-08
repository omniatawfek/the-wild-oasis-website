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
  // output: "export",
};

export default nextConfig;
