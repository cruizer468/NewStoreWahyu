import "server-only";
import nodemailer from "nodemailer";

export type DeliveredAccount = {
  email?: string;
  password?: string;
  code?: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
        .join("<br />");
    })
    .join("<br /><br />");

  const buyerName = params.buyerName || "Customer";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2>Pembayaran Berhasil</h2>
      <p>Halo ${buyerName},</p>
      <p>Pembayaran untuk order <b>${params.orderId}</b> sudah berhasil.</p>
      <p><b>Produk:</b> ${params.productName}</p>
      <p>Berikut data akun kamu:</p>
      <div style="padding: 12px; border: 1px solid #ddd; background: #fafafa;">
        ${lines}
      </div>
      <p style="margin-top: 16px;">Terima kasih.</p>
    </div>
  `;

  const text = `Halo ${buyerName},

Pembayaran untuk order ${params.orderId} sudah berhasil.

Produk: ${params.productName}

Berikut data akun kamu:
${params.accounts
  .map((acc, index) =>
    [
      `Akun ${index + 1}`,
      acc.email ? `Email: ${acc.email}` : null,
      acc.password ? `Password: ${acc.password}` : null,
      acc.code ? `Kode: ${acc.code}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  )
  .join("\n\n")}

Terima kasih.`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: params.to,
    subject: `Pesanan ${params.orderId} - ${params.productName}`,
    text,
    html,
  });
}