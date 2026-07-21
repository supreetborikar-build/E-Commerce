export type ProductCategory =
  | 'wearable-tech'
  | 'spatial-displays'
  | 'audio-gear'
  | 'outerwear-apparel'
  | 'smart-home'
  | 'edc-accessories';

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  icon: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  color?: string;
  size?: string;
  storage?: string;
  stock: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  categoryName: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  onSale?: boolean;
  images: string[];
  thumbnail: string;
  variants?: ProductVariant[];
  specifications: ProductSpecification[];
  tags: string[];
  createdAt: string;
}

export interface ProductFilterParams {
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}
