import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function getOrder(orderId: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", orderId)
    .maybeSingle();

  if (error) {
    console.error("GET ORDER ERROR:", error);
    return null;
  }

  return data;
}

export async function getOrderById(orderId: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      order_id,
      invoice_code,
      buyer_name,
      buyer_email,
      buyer_whatsapp,
      quantity,
      gross_amount,
      payment_status,
      paid_at,
      delivery_status,
      delivered_at,
      product_id,
      products (
        name
      )
    `)
    .eq("order_id", orderId)
    .maybeSingle();

  if (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    return null;
  }

  return data;
}

export async function updateOrderStatus(
  orderId: string,
  paymentStatus: string
) {
  const supabase = getSupabaseServerClient();

  const payload: Record<string, unknown> = {
    payment_status: paymentStatus,
    updated_at: new Date().toISOString(),
  };

  if (paymentStatus === "paid") {
    payload.paid_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("orders")
    .update(payload)
    .eq("order_id", orderId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    return null;
  }

  return data;
}

export async function markOrderDelivered(
  orderId: string,
  deliveredItemIds?: string[]
) {
  const supabase = getSupabaseServerClient();

  const payload: Record<string, unknown> = {
    delivery_status: "delivered",
    delivered_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (deliveredItemIds && deliveredItemIds.length > 0) {
    payload.delivered_accounts = deliveredItemIds;
  }

  const { data, error } = await supabase
    .from("orders")
    .update(payload)
    .eq("order_id", orderId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("MARK ORDER DELIVERED ERROR:", error);
    return null;
  }

  return data;
}