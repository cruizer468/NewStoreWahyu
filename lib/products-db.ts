import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Product } from "@/lib/product-types";

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("products")
      .select("id, name, slug, price, stock, description, image, is_active");

    if (error) {
      console.error("GET PRODUCTS ERROR:", error);
      return [];
    }

    return data ?? [];
  } catch (err) {
    console.error("GET PRODUCTS FATAL ERROR:", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log("GET PRODUCT SLUG:", slug);

    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("products")
      .select("id, name, slug, price, stock, description, image, is_active")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("GET PRODUCT BY SLUG ERROR:", error);
      return null;
    }

    console.log("GET PRODUCT BY SLUG DATA:", data);

    return data ?? null;
  } catch (err) {
    console.error("GET PRODUCT BY SLUG FATAL ERROR:", err);
    return null;
  }
}