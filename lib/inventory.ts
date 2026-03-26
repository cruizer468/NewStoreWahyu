import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase";

export type InventoryItem = {
  id: string;
  product_id: string;
  account_email: string | null;
  account_password: string | null;
  account_code: string | null;
  account_username: string | null;
  account_note: string | null;
  status: string | null;
  is_sold: boolean | null;
  order_id: string | null;
};

export async function takeInventory(
  productId: string,
  quantity: number,
  orderId: string
): Promise<InventoryItem[] | null> {
  const supabase = getSupabaseServerClient();

  const { data: availableItems, error: fetchError } = await supabase
    .from("inventory")
    .select(`
      id,
      product_id,
      account_email,
      account_password,
      account_code,
      account_username,
      account_note,
      status,
      is_sold,
      order_id
    `)
    .eq("product_id", productId)
    .eq("status", "pending")
    .eq("is_sold", false)
    .is("order_id", null)
    .limit(quantity);

  if (fetchError) {
    console.error("TAKE INVENTORY FETCH ERROR:", fetchError);
    return null;
  }

  if (!availableItems || availableItems.length < quantity) {
    return null;
  }

  const inventoryIds = availableItems.map((item) => item.id);

  const { error: updateError } = await supabase
    .from("inventory")
    .update({
      status: "reserved",
      order_id: orderId,
      updated_at: new Date().toISOString(),
    })
    .in("id", inventoryIds);

  if (updateError) {
    console.error("TAKE INVENTORY UPDATE ERROR:", updateError);
    return null;
  }

  const { data: reservedItems, error: refetchError } = await supabase
    .from("inventory")
    .select(`
      id,
      product_id,
      account_email,
      account_password,
      account_code,
      account_username,
      account_note,
      status,
      is_sold,
      order_id
    `)
    .in("id", inventoryIds);

  if (refetchError) {
    console.error("TAKE INVENTORY REFETCH ERROR:", refetchError);
    return null;
  }

  return reservedItems ?? null;
}

export async function releaseInventory(
  inventoryIds: string[],
  orderId?: string
) {
  if (!inventoryIds.length) return [];

  const supabase = getSupabaseServerClient();

  let query = supabase
    .from("inventory")
    .update({
      status: "pending",
      is_sold: false,
      order_id: null,
      updated_at: new Date().toISOString(),
    })
    .in("id", inventoryIds);

  if (orderId) {
    query = query.eq("order_id", orderId);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error("RELEASE INVENTORY ERROR:", error);
    return null;
  }

  return data;
}

export async function markInventoryDelivered(
  inventoryIds: string[],
  orderId: string
) {
  if (!inventoryIds.length) return [];

  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("inventory")
    .update({
      status: "delivered",
      is_sold: true,
      order_id: orderId,
      sold_at: new Date().toISOString(),
      delivered_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .in("id", inventoryIds)
    .eq("order_id", orderId)
    .select();

  if (error) {
    console.error("MARK INVENTORY DELIVERED ERROR:", error);
    return null;
  }

  return data;
}