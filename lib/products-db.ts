import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Product } from "@/lib/product-types";

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, price, stock, description, image, is_active");

  if (error) {
    console.error("GET PRODUCTS ERROR:", error.message);
    return [];
  }

  console.log("GET PRODUCTS DATA:", data);

  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, price, stock, description, image, is_active")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error.message);
    return null;
  }

  return data;
}