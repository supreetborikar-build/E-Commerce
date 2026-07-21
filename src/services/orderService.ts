import ordersData from '../data/orders.json';
import { Order, ShippingAddress, PaymentInfo } from '../types/order';
import { CartItem } from '../types/cart';
import { delay } from '../utils/delay';

export class OrderService {
  private static orders: Order[] = ordersData as Order[];

  static async getOrders(): Promise<Order[]> {
    await delay(350);
    return this.orders;
  }

  static async getOrderById(id: string): Promise<Order | null> {
    await delay(300);
    return this.orders.find((o) => o.id === id || o.orderNumber === id) || null;
  }

  static async createOrder(data: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentInfo: PaymentInfo;
    subtotal: number;
    discount: number;
    shippingFee: number;
    tax: number;
    total: number;
  }): Promise<Order> {
    await delay(600);
    const orderNum = `NVM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: data.shippingAddress.fullName,
      customerEmail: data.shippingAddress.email,
      items: data.items,
      subtotal: data.subtotal,
      discount: data.discount,
      shippingFee: data.shippingFee,
      tax: data.tax,
      total: data.total,
      status: 'processing',
      shippingAddress: data.shippingAddress,
      paymentInfo: data.paymentInfo,
      trackingNumber: `NVM-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);
    return newOrder;
  }

  static async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    await delay(300);
    const order = this.orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      return { ...order };
    }
    return null;
  }
}
