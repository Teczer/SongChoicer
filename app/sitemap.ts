import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://songchoicer.mehdihattou.com';

  return [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.5,
      url: `${baseUrl}/privacy`,
    },
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.8,
      url: `${baseUrl}/resultcard`,
    },
  ];
}
