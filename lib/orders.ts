import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function getOrder(orderId: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
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
      id,
      invoice_code,
      buyer_name,
      buyer_email,
      buyer_whatsapp,
      quantity,
      total_amount,
      payment_status,
      delivery_status,
      product_id,
      products (
        name
      )
    `)
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    return null;
  }

  return data;
}

export async function updateOrderStatus(orderId: string, paymentStatus: string) {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("orders")
    .update({
      payment_status: paymentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
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

  const { data, error } = await supabase
    .from("orders")
    .update({
      delivery_status: "delivered",
      delivered_at: new Date().toISOString(),
      delivered_item_ids: deliveredItemIds ?? [],
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("MARK ORDER DELIVERED ERROR:", error);
    return null;
  }

  return data;
}