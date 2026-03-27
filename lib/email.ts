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

function escapeHtml(value?: string) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendAccountEmail(params: {
  to: string;
  buyerName?: string;
  productName: string;
  orderId: string;
  accounts: DeliveredAccount[];
}) {
  const buyerName = escapeHtml(params.buyerName || "Customer");
  const productName = escapeHtml(params.productName);
  const orderId = escapeHtml(params.orderId);

  const accountCardsHtml = params.accounts
    .map((acc, index) => {
      const email = escapeHtml(acc.email);
      const password = escapeHtml(acc.password);
      const code = escapeHtml(acc.code);

      return `
        <tr>
          <td style="padding: 0 0 14px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background: #111111; border: 2px solid #ffd400; border-radius: 14px;">
              <tr>
                <td style="padding: 14px 16px; font-family: Arial, Helvetica, sans-serif; color: #ffffff;">
                  <div style="font-size: 15px; font-weight: 700; color: #ffd400; margin-bottom: 10px;">
                    ⚡ Akun ${index + 1}
                  </div>

                  ${
                    email
                      ? `
                    <div style="font-size: 13px; line-height: 1.7; margin-bottom: 4px;">
                      <span style="color: #ffd400; font-weight: 700;">Email:</span>
                      <span style="color: #ffffff;"> ${email}</span>
                    </div>`
                      : ""
                  }

                  ${
                    password
                      ? `
                    <div style="font-size: 13px; line-height: 1.7; margin-bottom: 4px;">
                      <span style="color: #ffd400; font-weight: 700;">Password:</span>
                      <span style="color: #ffffff;"> ${password}</span>
                    </div>`
                      : ""
                  }

                  ${
                    code
                      ? `
                    <div style="font-size: 13px; line-height: 1.7;">
                      <span style="color: #ffd400; font-weight: 700;">Kode:</span>
                      <span style="color: #ffffff;"> ${code}</span>
                    </div>`
                      : ""
                  }
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");

  const accountsText = params.accounts
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
    .join("\n\n");

  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pesanan Berhasil</title>
</head>
<body style="margin:0; padding:0; background-color:#ececec;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; background:#ececec; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:760px; border-collapse:collapse;">

          <!-- HEADER -->
          <tr>
            <td style="background:#000000; border:3px solid #000000; padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="height:10px; background:repeating-linear-gradient(45deg, #ffd400, #ffd400 10px, #000000 10px, #000000 20px); font-size:0; line-height:0;">
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="font-family: Arial, Helvetica, sans-serif; color:#ffffff;">
                          <div style="font-size:30px; line-height:1;">⚡</div>
                        </td>
                        <td valign="middle" style="padding-left:10px; font-family: Arial, Helvetica, sans-serif; color:#ffffff; font-size:18px; font-weight:800; letter-spacing:0.5px;">
                          HOLLY STORE
                        </td>
                        <td align="right" valign="middle">
                          <div style="font-size:54px; line-height:1;">⚡🐹⚡</div>
                        </td>
                      </tr>
                    </table>
                    <div style="font-family: Arial, Helvetica, sans-serif; color:#ffd400; font-size:12px; margin-top:8px; font-weight:700;">
                      Proses instan • otomatis • secepat petir
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SPACING -->
          <tr><td style="height:16px;"></td></tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background:#f7f7f7; border:3px solid #111111; padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:28px 24px 10px 24px; font-family: Arial, Helvetica, sans-serif; color:#111111;">
                    <div style="font-size:28px; font-weight:800; line-height:1.2; margin-bottom:10px;">
                      Pembayaran Berhasil! ⚡
                    </div>
                    <div style="font-size:14px; line-height:1.8; margin-bottom:8px;">
                      Halo <b>${buyerName}</b>,
                    </div>
                    <div style="font-size:14px; line-height:1.8; margin-bottom:18px;">
                      Pembayaran untuk pesanan <b>#${orderId}</b> telah berhasil kami terima.
                    </div>
                  </td>
                </tr>

                <!-- INFO BOX -->
                <tr>
                  <td style="padding:0 24px 20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; background:#ffffff; border:2px solid #111111;">
                      <tr>
                        <td style="padding:16px 18px; font-family: Arial, Helvetica, sans-serif; color:#111111;">
                          <div style="font-size:16px; font-weight:800; margin-bottom:12px;">
                            Detail Pesanan
                          </div>
                          <div style="font-size:13px; line-height:1.8;">
                            <b>ID Pesanan:</b> ${orderId}<br/>
                            <b>Produk:</b> ${productName}<br/>
                            <b>Jumlah Akun:</b> ${params.accounts.length}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ACCOUNT TITLE -->
                <tr>
                  <td style="padding:0 24px 10px 24px; font-family: Arial, Helvetica, sans-serif;">
                    <div style="font-size:16px; font-weight:800; color:#111111;">
                      Data Akun Kamu
                    </div>
                    <div style="font-size:13px; color:#444444; margin-top:4px; line-height:1.7;">
                      Simpan data berikut dengan aman ya.
                    </div>
                  </td>
                </tr>

                <!-- ACCOUNT LIST -->
                <tr>
                  <td style="padding:0 24px 8px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${accountCardsHtml}
                    </table>
                  </td>
                </tr>

                <!-- NOTE -->
                <tr>
                  <td style="padding:0 24px 24px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff8d6; border:1px solid #ffd400; border-radius:10px;">
                      <tr>
                        <td style="padding:14px 16px; font-family: Arial, Helvetica, sans-serif; color:#111111; font-size:13px; line-height:1.8;">
                          <b>⚠ Catatan:</b><br/>
                          Mohon jangan membagikan email, password, atau kode akun ke siapa pun.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- THANK YOU -->
                <tr>
                  <td style="padding:0 24px 28px 24px; font-family: Arial, Helvetica, sans-serif; color:#111111;">
                    <div style="font-size:14px; line-height:1.8;">
                      Terima kasih sudah belanja di <b>HOLLY STORE</b> 💛
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SEPARATOR -->
          <tr><td style="height:16px;"></td></tr>
          <tr>
            <td style="height:6px; background:repeating-linear-gradient(45deg, #111111, #111111 10px, #ececec 10px, #ececec 20px); font-size:0; line-height:0;">
              &nbsp;
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:18px 16px 10px 16px; text-align:center; font-family: Arial, Helvetica, sans-serif; color:#555555; font-size:11px; line-height:1.8;">
              ⚠ Email ini dikirim secara otomatis, mohon tidak membalas email ini.<br/>
              © 2026 <span style="background:#ffd400; color:#111111; padding:2px 6px; font-weight:700;">HOLLY STORE</span> - All Rights Reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const text = `Halo ${params.buyerName || "Customer"},

Pembayaran untuk order ${params.orderId} sudah berhasil.

Produk: ${params.productName}
Jumlah Akun: ${params.accounts.length}

Berikut data akun kamu:
${accountsText}

Catatan:
Jangan bagikan data akun ke siapa pun.

Terima kasih sudah belanja di WAYYY STORE.`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: params.to,
    subject: `Pesanan ${params.orderId} - ${params.productName}`,
    text,
    html,
  });
}