type DeliveredAccount = {
  email?: string;
  password?: string;
  code?: string;
};

export async function sendAccountEmail(params: {
  to: string;
  buyerName?: string;
  productName: string;
  orderId: string;
  accounts: DeliveredAccount[];
}) {
  const lines = params.accounts
    .map((acc, index) => {
      return [
        `Akun ${index + 1}`,
        acc.email ? `Email: ${acc.email}` : null,
        acc.password ? `Password: ${acc.password}` : null,
        acc.code ? `Kode: ${acc.code}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const content = `Halo ${params.buyerName || "Customer"},

Pembayaran untuk order ${params.orderId} sudah berhasil.

Produk: ${params.productName}

Berikut data akun kamu:
${lines}

Terima kasih.`;

  console.log("=== EMAIL TERKIRIM ===");
  console.log("TO:", params.to);
  console.log(content);
}