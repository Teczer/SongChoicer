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
  async rewrites() {
    return [
      {
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
        source: '/ingest/static/:path*',
      },
      {
        destination: 'https://eu.i.posthog.com/:path*',
        source: '/ingest/:path*',
      },
      {
        destination: 'https://eu.i.posthog.com/decide',
        source: '/ingest/decide',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
});

module.exports = nextConfig;
