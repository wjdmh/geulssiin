import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/admin'],
      },
    ],
    sitemap: 'https://geulssiin.com/sitemap.xml',
    host: 'https://geulssiin.com',
  }
}
