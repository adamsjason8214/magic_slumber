import { BookingFormData, OrderSummary } from "@/types";
import { FREE_DELIVERY_MIN_DAYS, SLUMBER_POD_DAILY_RATE, SLUMBER_TOT_DAILY_RATE, ULTIMATE_BUNDLE_DAILY_RATE } from "./products";

// Mailgun configuration
const MAILGUN_API_KEY = (process.env.MAILGUN_API_KEY || "").trim();
const MAILGUN_DOMAIN = "mg.magicalslumber.com";
const FROM_EMAIL = "Magical Slumber Orlando <noreply@mg.magicalslumber.com>";

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Send email via Mailgun API (with both HTML and plain text for better deliverability)
async function sendEmail(to: string, subject: string, html: string, text: string): Promise<void> {
  const params = new URLSearchParams();
  params.append("from", FROM_EMAIL);
  params.append("to", to);
  params.append("subject", subject);
  params.append("html", html);
  params.append("text", text);

  const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mailgun error: ${response.status} - ${error}`);
  }
}

export async function sendOrderNotification(
  booking: BookingFormData,
  orderSummary: OrderSummary,
  orderId: string,
  orderDescription?: string
) {
  const subject = `New Order #${orderId} - ${escapeHtml(booking.firstName)} ${escapeHtml(booking.lastName)}`;
  const html = `
    <h1>New Magical Slumber Order!</h1>
    <p><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>

    <h2>Customer Information</h2>
    <p><strong>Name:</strong> ${escapeHtml(booking.firstName)} ${escapeHtml(booking.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>

    <h2>Resort Details</h2>
    <p><strong>Resort:</strong> ${escapeHtml(booking.resortName)}</p>
    <p><strong>Address:</strong> ${escapeHtml(booking.resortAddress)}</p>
    ${booking.agentReferralEmail ? `<p><strong>Agent Referral:</strong> ${escapeHtml(booking.agentReferralEmail)}</p>` : ""}

    <h2>Rental Period</h2>
    <p><strong>Check-in:</strong> ${escapeHtml(booking.checkInDate)}</p>
    <p><strong>Check-out:</strong> ${escapeHtml(booking.checkOutDate)}</p>
    <p><strong>Delivery Time:</strong> ${escapeHtml(booking.deliveryTime)}</p>
    <p><strong>Rental Period:</strong> ${orderSummary.nights} night${orderSummary.nights > 1 ? "s" : ""}</p>

    <h2>Order Details</h2>
    <p><strong>Items:</strong> ${escapeHtml(orderDescription || "Rental items")}</p>

    <h2>Order Total</h2>
    <p><strong>Subtotal:</strong> $${orderSummary.subtotal.toFixed(2)}</p>
    <p><strong>Delivery Fee:</strong> ${orderSummary.deliveryFee === 0 ? `FREE (${FREE_DELIVERY_MIN_DAYS}+ nights)` : "$" + orderSummary.deliveryFee.toFixed(2)}</p>
    <p><strong>Sales Tax (7%):</strong> $${orderSummary.salesTax.toFixed(2)}</p>
    <p><strong>Processing Fee (3%):</strong> $${orderSummary.surcharge.toFixed(2)}</p>
    <p><strong>Total Charged:</strong> $${orderSummary.total.toFixed(2)}</p>

    ${booking.specialRequests ? `<h2>Special Requests</h2><p>${escapeHtml(booking.specialRequests)}</p>` : ""}
  `;

  const text = `
New Magical Slumber Order!

Order ID: ${orderId}

CUSTOMER INFORMATION
Name: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: ${booking.phone}

RESORT DETAILS
Resort: ${booking.resortName}
Address: ${booking.resortAddress}
${booking.agentReferralEmail ? `Agent Referral: ${booking.agentReferralEmail}` : ""}

RENTAL PERIOD
Check-in: ${booking.checkInDate}
Check-out: ${booking.checkOutDate}
Delivery Time: ${booking.deliveryTime}
Rental Period: ${orderSummary.nights} night${orderSummary.nights > 1 ? "s" : ""}

ORDER DETAILS
Items: ${orderDescription || "Rental items"}

ORDER TOTAL
Subtotal: $${orderSummary.subtotal.toFixed(2)}
Delivery Fee: ${orderSummary.deliveryFee === 0 ? `FREE (${FREE_DELIVERY_MIN_DAYS}+ nights)` : "$" + orderSummary.deliveryFee.toFixed(2)}
Sales Tax (7%): $${orderSummary.salesTax.toFixed(2)}
Processing Fee (3%): $${orderSummary.surcharge.toFixed(2)}
Total Charged: $${orderSummary.total.toFixed(2)}
${booking.specialRequests ? `\nSPECIAL REQUESTS\n${booking.specialRequests}` : ""}
  `.trim();

  await sendEmail("magicalslumberorlando@gmail.com", subject, html, text);
}

export async function sendCustomerConfirmation(
  booking: BookingFormData,
  orderSummary: OrderSummary,
  orderId: string,
  orderDescription?: string,
  upgradeInfo?: { eligible: boolean; sessionId: string; originalProductId: string; nights: number }
) {
  // Build upgrade CTA block if eligible
  let upgradeCta = "";
  let upgradeCtaText = "";
  if (upgradeInfo?.eligible) {
    const originalRate = upgradeInfo.originalProductId === "slumber-pod" ? SLUMBER_POD_DAILY_RATE : SLUMBER_TOT_DAILY_RATE;
    const perNight = ULTIMATE_BUNDLE_DAILY_RATE - originalRate;
    const upgradeTotal = perNight * upgradeInfo.nights;
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://magicalslumber.com").trim().replace(/\/$/, "");
    const upgradeUrl = `${baseUrl}/upgrade?session_id=${upgradeInfo.sessionId}`;

    upgradeCta = `
        <div style="background: linear-gradient(135deg, #1e3a8a, #6366f1); padding: 24px; border-radius: 8px; margin: 20px 0; text-align: center; color: white;">
          <h3 style="color: white; margin-top: 0;">Upgrade to the Ultimate Slumber Bundle!</h3>
          <p style="color: #e0e7ff;">Get the complete sleep setup: Slumber Pod + Portable Fan + Sound Machine + Video Baby Monitor</p>
          <p style="font-size: 22px; font-weight: bold; color: white; margin: 12px 0;">Only $${upgradeTotal.toFixed(2)} more</p>
          <p style="color: #c7d2fe; font-size: 14px; margin-bottom: 16px;">$${perNight.toFixed(2)}/night x ${upgradeInfo.nights} night${upgradeInfo.nights > 1 ? "s" : ""} &mdash; No additional fees!</p>
          <a href="${upgradeUrl}" style="display: inline-block; background: white; color: #1e3a8a; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold;">Upgrade Now &rarr;</a>
        </div>`;

    upgradeCtaText = `
UPGRADE TO THE ULTIMATE SLUMBER BUNDLE!
Get the complete sleep setup: Slumber Pod + Portable Fan + Sound Machine + Video Baby Monitor
Only $${upgradeTotal.toFixed(2)} more ($${perNight.toFixed(2)}/night x ${upgradeInfo.nights} night${upgradeInfo.nights > 1 ? "s" : ""} - No additional fees!)
Upgrade now: ${upgradeUrl}
`;
  }
  const subject = `Order Confirmed! Magical Slumber Orlando #${orderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Magical Slumber Orlando</h1>
      </div>

      <div style="padding: 30px; background: #f9fafb;">
        <h2 style="color: #1e3a8a;">Thank you for your order, ${escapeHtml(booking.firstName)}!</h2>
        <p>Your order has been confirmed and we're preparing your items for delivery.</p>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order Number:</strong> ${escapeHtml(orderId)}</p>

          <h3 style="color: #1e3a8a;">Your Contact Information</h3>
          <p><strong>Name:</strong> ${escapeHtml(booking.firstName)} ${escapeHtml(booking.lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>

          <h3 style="color: #1e3a8a;">Delivery Details</h3>
          <p><strong>Resort:</strong> ${escapeHtml(booking.resortName)}</p>
          <p><strong>Address:</strong> ${escapeHtml(booking.resortAddress)}</p>
          <p><strong>Delivery Date:</strong> ${escapeHtml(booking.checkInDate)}</p>
          <p><strong>Delivery Time:</strong> ${escapeHtml(booking.deliveryTime)}</p>
          <p><strong>Pickup Date:</strong> ${escapeHtml(booking.checkOutDate)}</p>
          <p><strong>Rental Period:</strong> ${orderSummary.nights} night${orderSummary.nights > 1 ? "s" : ""}</p>
        </div>

        ${booking.specialRequests ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">Special Requests</h3>
          <p style="color: #78350f;">${escapeHtml(booking.specialRequests)}</p>
        </div>
        ` : ""}

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a;">Order Summary</h3>
          <p><strong>Your Rental:</strong> ${escapeHtml(orderDescription || "Rental items")}</p>

          <hr style="margin: 20px 0;">

          <p><strong>Subtotal:</strong> $${orderSummary.subtotal.toFixed(2)}</p>
          <p><strong>Delivery Fee:</strong> ${orderSummary.deliveryFee === 0 ? `<span style='color: #22c55e;'>FREE (${FREE_DELIVERY_MIN_DAYS}+ nights)</span>` : "$" + orderSummary.deliveryFee.toFixed(2)}</p>
          <p><strong>Sales Tax (7%):</strong> $${orderSummary.salesTax.toFixed(2)}</p>
          <p><strong>Processing Fee (3%):</strong> $${orderSummary.surcharge.toFixed(2)}</p>
          <p style="font-size: 18px;"><strong>Total Charged:</strong> $${orderSummary.total.toFixed(2)}</p>
        </div>

        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a; margin-top: 0;">Important Information</h3>
          <ul>
            <li>Please have items ready for pickup on your checkout date.</li>
            <li>Contact us if you need to modify your order.</li>
          </ul>
        </div>

        ${upgradeCta}

        <p>Questions? Contact us at <a href="mailto:magicalslumberorlando@gmail.com">magicalslumberorlando@gmail.com</a></p>

        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Thank you for choosing Magical Slumber Orlando!<br>
          We hope you have a magical, well-rested vacation!
        </p>
      </div>
    </div>
  `;

  const text = `
MAGICAL SLUMBER ORLANDO
Order Confirmed!

Thank you for your order, ${booking.firstName}!

Your order has been confirmed and we're preparing your items for delivery.

Order Number: ${orderId}

YOUR CONTACT INFORMATION
Name: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: ${booking.phone}

DELIVERY DETAILS
Resort: ${booking.resortName}
Address: ${booking.resortAddress}
Delivery Date: ${booking.checkInDate}
Delivery Time: ${booking.deliveryTime}
Pickup Date: ${booking.checkOutDate}
Rental Period: ${orderSummary.nights} night${orderSummary.nights > 1 ? "s" : ""}
${booking.specialRequests ? `\nSPECIAL REQUESTS\n${booking.specialRequests}` : ""}

ORDER SUMMARY
Your Rental: ${orderDescription || "Rental items"}

Subtotal: $${orderSummary.subtotal.toFixed(2)}
Delivery Fee: ${orderSummary.deliveryFee === 0 ? `FREE (${FREE_DELIVERY_MIN_DAYS}+ nights)` : "$" + orderSummary.deliveryFee.toFixed(2)}
Sales Tax (7%): $${orderSummary.salesTax.toFixed(2)}
Processing Fee (3%): $${orderSummary.surcharge.toFixed(2)}
Total Charged: $${orderSummary.total.toFixed(2)}

IMPORTANT INFORMATION
- Please have items ready for pickup on your checkout date.
- Contact us if you need to modify your order.
${upgradeCtaText}
Questions? Contact us at magicalslumberorlando@gmail.com

Thank you for choosing Magical Slumber Orlando!
We hope you have a magical, well-rested vacation!
  `.trim();

  await sendEmail(booking.email, subject, html, text);
}

// Send upgrade notification to business
export async function sendUpgradeNotification(
  booking: BookingFormData,
  orderId: string,
  originalProductName: string,
  upgradeAmount: number,
  nights: number
) {
  const subject = `UPGRADE #${orderId} - ${escapeHtml(booking.firstName)} ${escapeHtml(booking.lastName)} → Ultimate Bundle`;
  const html = `
    <h1 style="color: #1e3a8a;">Bundle Upgrade Order!</h1>
    <p><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>

    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border: 2px solid #f59e0b; margin: 16px 0;">
      <h3 style="color: #92400e; margin-top: 0;">⚠️ ACTION NEEDED</h3>
      <p style="color: #78350f;">Customer upgraded from <strong>${escapeHtml(originalProductName)}</strong> to <strong>Ultimate Slumber Bundle</strong>.</p>
      <p style="color: #78350f;"><strong>Add to delivery:</strong> Portable Fan, Sound Machine, Video Baby Monitor</p>
    </div>

    <h2>Customer Information</h2>
    <p><strong>Name:</strong> ${escapeHtml(booking.firstName)} ${escapeHtml(booking.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>

    <h2>Delivery Details</h2>
    <p><strong>Resort:</strong> ${escapeHtml(booking.resortName)}</p>
    <p><strong>Address:</strong> ${escapeHtml(booking.resortAddress)}</p>
    <p><strong>Check-in:</strong> ${escapeHtml(booking.checkInDate)}</p>
    <p><strong>Check-out:</strong> ${escapeHtml(booking.checkOutDate)}</p>
    <p><strong>Delivery Time:</strong> ${escapeHtml(booking.deliveryTime)}</p>
    <p><strong>Nights:</strong> ${nights}</p>

    <h2>Upgrade Payment</h2>
    <p><strong>Upgrade Amount Charged:</strong> $${upgradeAmount.toFixed(2)}</p>
    <p><em>No delivery fee, tax, or service fee — already paid on original order.</em></p>
  `;

  const text = `
BUNDLE UPGRADE ORDER!

Order ID: ${orderId}

⚠️ ACTION NEEDED
Customer upgraded from ${originalProductName} to Ultimate Slumber Bundle.
Add to delivery: Portable Fan, Sound Machine, Video Baby Monitor

CUSTOMER INFORMATION
Name: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: ${booking.phone}

DELIVERY DETAILS
Resort: ${booking.resortName}
Address: ${booking.resortAddress}
Check-in: ${booking.checkInDate}
Check-out: ${booking.checkOutDate}
Delivery Time: ${booking.deliveryTime}
Nights: ${nights}

UPGRADE PAYMENT
Upgrade Amount Charged: $${upgradeAmount.toFixed(2)}
No delivery fee, tax, or service fee - already paid on original order.
  `.trim();

  await sendEmail("magicalslumberorlando@gmail.com", subject, html, text);
}

// Send upgrade confirmation to customer
export async function sendUpgradeConfirmation(
  booking: BookingFormData,
  orderId: string,
  originalProductName: string,
  upgradeAmount: number,
  nights: number
) {
  const subject = `Upgrade Confirmed! Ultimate Slumber Bundle #${orderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">Magical Slumber Orlando</h1>
      </div>

      <div style="padding: 30px; background: #f9fafb;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; background: #dcfce7; border-radius: 50%; padding: 16px; margin-bottom: 12px;">
            <span style="font-size: 32px;">✓</span>
          </div>
          <h2 style="color: #1e3a8a;">Upgrade Confirmed, ${escapeHtml(booking.firstName)}!</h2>
          <p>You've been upgraded from ${escapeHtml(originalProductName)} to the <strong>Ultimate Slumber Bundle</strong>!</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a;">Your Bundle Now Includes</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">✅ Slumber Pod</li>
            <li style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">✅ Portable Fan</li>
            <li style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">✅ Sound Machine</li>
            <li style="padding: 8px 0;">✅ Video Baby Monitor</li>
          </ul>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a;">Delivery Details</h3>
          <p><strong>Resort:</strong> ${escapeHtml(booking.resortName)}</p>
          <p><strong>Address:</strong> ${escapeHtml(booking.resortAddress)}</p>
          <p><strong>Delivery Date:</strong> ${escapeHtml(booking.checkInDate)}</p>
          <p><strong>Delivery Time:</strong> ${escapeHtml(booking.deliveryTime)}</p>
          <p><strong>Pickup Date:</strong> ${escapeHtml(booking.checkOutDate)}</p>
          <p><strong>Rental Period:</strong> ${nights} night${nights > 1 ? "s" : ""}</p>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a;">Upgrade Payment</h3>
          <p><strong>Upgrade Amount:</strong> $${upgradeAmount.toFixed(2)}</p>
          <p style="color: #22c55e;"><strong>Delivery Fee:</strong> Already paid</p>
          <p style="color: #22c55e;"><strong>Tax & Service Fee:</strong> Waived</p>
        </div>

        <p>Questions? Contact us at <a href="mailto:magicalslumberorlando@gmail.com">magicalslumberorlando@gmail.com</a></p>

        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Thank you for upgrading with Magical Slumber Orlando!<br>
          Your little one is going to sleep like a dream!
        </p>
      </div>
    </div>
  `;

  const text = `
MAGICAL SLUMBER ORLANDO
Upgrade Confirmed!

Upgrade Confirmed, ${booking.firstName}!
You've been upgraded from ${originalProductName} to the Ultimate Slumber Bundle!

YOUR BUNDLE NOW INCLUDES
- Slumber Pod
- Portable Fan
- Sound Machine
- Video Baby Monitor

DELIVERY DETAILS
Resort: ${booking.resortName}
Address: ${booking.resortAddress}
Delivery Date: ${booking.checkInDate}
Delivery Time: ${booking.deliveryTime}
Pickup Date: ${booking.checkOutDate}
Rental Period: ${nights} night${nights > 1 ? "s" : ""}

UPGRADE PAYMENT
Upgrade Amount: $${upgradeAmount.toFixed(2)}
Delivery Fee: Already paid
Tax & Service Fee: Waived

Questions? Contact us at magicalslumberorlando@gmail.com

Thank you for upgrading with Magical Slumber Orlando!
Your little one is going to sleep like a dream!
  `.trim();

  await sendEmail(booking.email, subject, html, text);
}
