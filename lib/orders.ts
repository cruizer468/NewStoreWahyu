export type Order = {
  orderId: string;
  productId: string;
  buyerEmail: string;
  buyerName?: string;
  buyerWhatsapp?: string;
  quantity?: number;
  grossAmount: number;
  status: "pending" | "paid" | "expired" | "failed";
  delivered: boolean;
  deliveredItems?: string[];
};

export const orders: Order[] = [];

export function getOrder(orderId: string) {
  return orders.find((o) => o.orderId === orderId);
}

export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
) {
  const order = orders.find((o) => o.orderId === orderId);
  if (!order) return false;

  order.status = status;
  return true;
}

export function markOrderDelivered(orderId: string, deliveredItems: string[]) {
  const order = orders.find((o) => o.orderId === orderId);
  if (!order) return false;

  order.delivered = true;
  order.deliveredItems = deliveredItems;
  return true;
}