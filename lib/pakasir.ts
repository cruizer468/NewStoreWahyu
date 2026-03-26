import { Pakasir } from "pakasir-sdk";

export function getPakasirClient() {
  const slug = process.env.PAKASIR_SLUG;
  const apikey = process.env.PAKASIR_API_KEY;

  if (!slug || !apikey) {
    throw new Error("PAKASIR_SLUG atau PAKASIR_API_KEY belum di-set");
  }

  return new Pakasir({
    slug,
    apikey,
  });
}