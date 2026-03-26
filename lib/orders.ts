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
  qrString?: string;
  qrUrl?: string;
  expiryTime?: string;
};

export const orders: Order[] = [];

export function getOrder(orderId: string) {
  return orders.find((o: Order) => o.orderId === orderId);
}

export function updateOrderStatus(
  orderId: string,
  status: Order["status"]
) {
  const order = orders.find((o: Order) => o.orderId === orderId);

  if (!order) {
    console.error("Order tidak ditemukan:", orderId);
    return false;
  }

  order.status = status;

  if (status === "paid") {
    order.delivered = true;
  }

  return true;
}