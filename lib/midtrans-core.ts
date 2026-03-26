const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";

const baseUrl = MIDTRANS_IS_PRODUCTION
  ? "https://api.midtrans.com"
  : "https://api.sandbox.midtrans.com";

export async function createQrisCharge(params: {
  orderId: string;
  grossAmount: number;
}) {
  const auth = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");

  const res = await fetch(`${baseUrl}/v2/charge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      payment_type: "qris",
      transaction_details: {
        order_id: params.orderId,
        gross_amount: params.grossAmount,
      },
      qris: {
        acquirer: "gopay",
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Midtrans QRIS error: ${text}`);
  }

  return res.json();
}

export async function getTransactionStatus(orderId: string) {
  const auth = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");

  const res = await fetch(`${baseUrl}/v2/${orderId}/status`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Midtrans status error: ${text}`);
  }

  return res.json();
}