import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendAccountEmail(
  to: string,
  accountEmail: string,
  accountPassword: string
) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Pembayaran berhasil ⚡",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Pembayaran berhasil ⚡</h2>
        <p>Terima kasih, pesanan kamu sudah dibayar.</p>
        <p>Berikut akun yang kamu beli:</p>
        <ul>
          <li><b>Email akun:</b> ${accountEmail}</li>
          <li><b>Password akun:</b> ${accountPassword}</li>
        </ul>
        <p>Simpan data ini dengan aman ya.</p>
      </div>
    `,
  });
}