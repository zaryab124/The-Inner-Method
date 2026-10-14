import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theinnermethod.com';

  // Core static routes
  const staticRoutes = [
    '',
    '/shop',
    '/free-resources',
    '/about',
    '/journal',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/refund',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic journal article routes
  const articleRoutes = ARTICLES.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
