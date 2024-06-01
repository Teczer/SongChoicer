/** @type {import('next').NextConfig} */

const hosts = [
  "coverartarchive.org",
  "via.placeholder.com",
  "images.genius.com",
  "images.unsplash.com",
  "musicbrainz.org",
  "ia802204.us.archive.org",
  "placehold.co",
  "i.scdn.co",
];

const nextConfig = {
  images: {
    remotePatterns: hosts.map((host) => ({
      hostname: host,
    })),
  },
};
export default nextConfig;
