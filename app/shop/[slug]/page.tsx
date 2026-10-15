import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} — ${product.subtitle}`,
    description: product.metaDescription,
    openGraph: {
      title: `${product.title} | The Inner Method`,
      description: product.metaDescription,
      type: 'book',
      images: [
        {
          url: `/covers/${product.slug}.jpg`,
          width: 800,
          height: 1200,
          alt: `${product.title} Cover`,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Schema.org Structured Data for Book & Product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Book', 'Product'],
    name: product.title,
    description: product.metaDescription,
    bookFormat: 'https://schema.org/EBook',
    numberOfPages: product.pageCount,
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      url: `https://thestudyabroadplaybook.com/shop/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount || 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
