import { assets, ProductItem, CollectionItem } from '@/assets.config';

/**
 * Shopify Storefront API Client (Mock Layer)
 * Provides typed access to demo products and collections now,
 * and will seamlessly bridge to the real Shopify GraphQL endpoint later.
 */

export async function getProducts(): Promise<ProductItem[]> {
  // Simulating async network fetch
  return Promise.resolve(assets.products);
}

export async function getProductByHandle(handle: string): Promise<ProductItem | null> {
  const prod = assets.products.find((p) => p.handle === handle);
  return Promise.resolve(prod || null);
}

export async function getCollections(): Promise<CollectionItem[]> {
  return Promise.resolve(assets.collections);
}

export async function getCollectionByHandle(handle: string): Promise<{
  collection: CollectionItem | null;
  products: ProductItem[];
}> {
  const collection = assets.collections.find((c) => c.handle === handle) || null;
  if (!collection) {
    return Promise.resolve({
      collection: null,
      products: assets.products,
    });
  }

  // Filter products by category or return all for default
  const filtered = assets.products.filter(
    (p) => p.category.toLowerCase().includes(handle.toLowerCase()) || handle === 'all'
  );

  return Promise.resolve({
    collection,
    products: filtered.length > 0 ? filtered : assets.products,
  });
}
