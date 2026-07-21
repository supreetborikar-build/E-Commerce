import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import reviewsData from '../data/reviews.json';
import { Product, ProductFilterParams, ProductReview } from '../types/product';
import { delay } from '../utils/delay';

export class ProductService {
  private static products: Product[] = productsData as Product[];

  static async getProducts(params?: ProductFilterParams): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await delay(300);
    let result = [...this.products];

    if (params?.category) {
      result = result.filter((p) => p.category === params.category);
    }

    if (params?.query) {
      const q = params.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (params?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (params.minPrice || 0));
    }

    if (params?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (params.maxPrice || Infinity));
    }

    if (params?.rating !== undefined) {
      result = result.filter((p) => p.rating >= (params.rating || 0));
    }

    if (params?.inStock) {
      result = result.filter((p) => p.stock > 0);
    }

    if (params?.onSale) {
      result = result.filter((p) => p.onSale);
    }

    // Sorting
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = result.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages,
    };
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    await delay(300);
    return this.products.find((p) => p.slug === slug) || null;
  }

  static async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    return this.products.find((p) => p.id === id) || null;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    await delay(300);
    return this.products.filter((p) => p.isFeatured);
  }

  static async getTrendingProducts(): Promise<Product[]> {
    await delay(300);
    return this.products.filter((p) => p.isBestSeller || p.rating >= 4.8);
  }

  static async getNewArrivals(): Promise<Product[]> {
    await delay(300);
    return this.products.filter((p) => p.isNew);
  }

  static async getCategories() {
    await delay(250);
    return categoriesData;
  }

  static async getProductReviews(_productId: string): Promise<ProductReview[]> {
    await delay(300);
    return reviewsData as ProductReview[];
  }

  static async addReview(
    _productId: string,
    review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>
  ): Promise<ProductReview> {
    await delay(400);
    const newReview: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    return newReview;
  }
}
