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