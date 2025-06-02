const hosts = [
  'coverartarchive.org',
  'via.placeholder.com',
  'images.genius.com',
  'images.unsplash.com',
  'musicbrainz.org',
  'ia802204.us.archive.org',
  'placehold.co',
  'i.scdn.co',
  'reflect.app',
  'lh3.googleusercontent.com',
];

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  images: {
    remotePatterns: hosts.map(host => ({
      hostname: host,
    })),
  },
});

module.exports = nextConfig;
