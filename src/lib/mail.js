import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.MAILTRAP_PORT || "2525"),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

/**
 * Sends form data via SMTP/Mailtrap
 * @param {string} subject - The email subject line
 * @param {object} data - Object containing the key-value pairs of the submitted form
 */
export async function sendFormEmail(subject, data) {
  const emailTo = process.env.NOTIFY_EMAIL || "admin@themarketplacepeeps.com";
  const emailFrom = process.env.MAIL_FROM || "himanshu@themarketplacepeeps.com";

  // Build clean visual HTML table of the form contents
  let htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #27272a; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff;">
      <div style="margin-bottom: 20px;">
        <span style="font-size: 12px; text-transform: uppercase; tracking-wider; font-weight: bold; color: #FF5A1F;">Notification</span>
        <h2 style="margin: 4px 0 0 0; color: #09090b; font-size: 20px; font-weight: 700;">${subject}</h2>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border-top: 1px solid #e4e4e7;">
        <tbody>
  `;

  for (const [key, value] of Object.entries(data)) {
    // Format camelCase or snake_case key to human readable sentence case
    const formattedKey = key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    let displayValue = value;

    if (value === null || value === undefined) {
      displayValue = `<em style="color: #a1a1aa;">Not provided</em>`;
    } else if (typeof value === "object") {
      displayValue = `<pre style="margin: 0; background: #f4f4f5; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 13px; color: #3f3f46; overflow-x: auto;">${JSON.stringify(value, null, 2)}</pre>`;
    } else if (typeof value === "boolean") {
      displayValue = value ? "Yes" : "No";
    } else {
      displayValue = String(value).replace(/\n/g, "<br />");
    }

    htmlContent += `
      <tr style="border-bottom: 1px solid #f4f4f5;">
        <td style="padding: 12px 8px; font-weight: 600; width: 35%; color: #71717a; font-size: 14px; vertical-align: top;">${formattedKey}</td>
        <td style="padding: 12px 8px; color: #18181b; font-size: 14px; vertical-align: top;">${displayValue}</td>
      </tr>
    `;
  }

  htmlContent += `
        </tbody>
      </table>
      
      <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #a1a1aa; text-align: center;">
        <p style="margin: 0 0 4px 0;">Submitted on ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC</p>
        <p style="margin: 0;">Sent via Mailtrap SMTP Integrator</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"The Marketplace Peeps" <${emailFrom}>`,
      to: emailTo,
      subject: subject,
      html: htmlContent,
    });
    console.log(`[Mailtrap] Email successfully sent to ${emailTo}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Mailtrap] Error sending email via SMTP:", error);
    return { success: false, error: error.message };
  }
}
