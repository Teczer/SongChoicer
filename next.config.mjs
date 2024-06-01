/** @type {import('next').NextConfig} */

const hosts = [
  "coverartarchive.org",
  "via.placeholder.com",
  "images.genius.com",
  "images.unsplash.com",
];

const nextConfig = {
  images: {
    remotePatterns: hosts.map((host) => ({
      hostname: host,
    })),
  },
};
export default nextConfig;
