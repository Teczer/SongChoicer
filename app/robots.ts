import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://songchoicer.com';

  return {
    rules: [
      {
        allow: '/',
        disallow: [
          '/api/*',
          '/*.json$',
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
          '/*.js$',
        ],
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
