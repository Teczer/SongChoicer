/** @type {import('next-sitemap').IConfig} */
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
  '/*.js$',
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://songchoicer.mehdihattou.com';

const BLACK_LIST_PATHS = ['api', 'test'];

module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        disallow: NEXT_SSG_FILES,
        userAgent: '*',
      },
      {
        disallow: '/api/*',
        userAgent: '*',
      },
    ],
  },
  siteUrl: SITE_URL,
  transform: async (config, path) => {
    // custom function to ignore the path
    if (path.endsWith('sitemap.xml') || path.endsWith('robots.txt') || BLACK_LIST_PATHS.some(p => path.includes(p))) {
      return null;
    }

    return {
      alternateRefs: config.alternateRefs ?? [],
      changefreq: config.changefreq,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      loc: path,
      priority: config.priority,
    };
  },
};
