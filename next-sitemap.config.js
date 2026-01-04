/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lingfan.site',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path === '/about') {
      priority = 0.5
      changefreq = 'monthly'
    } else if (path.startsWith('/best/')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.startsWith('/category/')) {
      priority = 0.8
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}
