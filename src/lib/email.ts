import { BookingFormData, OrderSummary } from "@/types";
import { FREE_DELIVERY_MIN_DAYS } from "./products";

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
  orderDescription?: string
) {
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

Questions? Contact us at magicalslumberorlando@gmail.com

Thank you for choosing Magical Slumber Orlando!
We hope you have a magical, well-rested vacation!
  `.trim();

  await sendEmail(booking.email, subject, html, text);
}
