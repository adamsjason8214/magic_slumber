import nodemailer from "nodemailer";
import { BookingFormData, OrderSummary } from "@/types";
import { calculateItemPrice } from "./products";

// Create reusable transporter
// For production, use actual Gmail credentials or a service like SendGrid/Resend
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
});

export async function sendOrderNotification(
  booking: BookingFormData,
  orderSummary: OrderSummary,
  orderId: string
) {
  const itemsList = orderSummary.items
    .map(
      (item) =>
        `- ${item.product.name} x${item.quantity} (${item.nights} nights) - $${(
          calculateItemPrice(item.product, item.nights) * item.quantity
        ).toFixed(2)}`
    )
    .join("\n");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "magicalslumberorlando@gmail.com",
    subject: `New Order #${orderId} - ${booking.firstName} ${booking.lastName}`,
    html: `
      <h1>New Magical Slumber Order!</h1>
      <p><strong>Order ID:</strong> ${orderId}</p>

      <h2>Customer Information</h2>
      <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>

      <h2>Resort Details</h2>
      <p><strong>Resort:</strong> ${booking.resortName}</p>
      <p><strong>Address:</strong> ${booking.resortAddress}</p>
      <p><strong>Room:</strong> ${booking.roomNumber}</p>

      <h2>Rental Period</h2>
      <p><strong>Check-in:</strong> ${booking.checkInDate}</p>
      <p><strong>Check-out:</strong> ${booking.checkOutDate}</p>
      <p><strong>Delivery Time:</strong> ${booking.deliveryTime}</p>
      <p><strong>Total Nights:</strong> ${orderSummary.nights}</p>

      <h2>Items Ordered</h2>
      <pre>${itemsList}</pre>

      <h2>Order Total</h2>
      <p><strong>Subtotal:</strong> $${orderSummary.subtotal.toFixed(2)}</p>
      <p><strong>Delivery Fee:</strong> $${orderSummary.deliveryFee.toFixed(2)}</p>
      <p><strong>Security Deposit:</strong> $${orderSummary.deposit.toFixed(2)} (refundable)</p>
      <p><strong>Total Charged:</strong> $${orderSummary.total.toFixed(2)}</p>

      ${booking.specialRequests ? `<h2>Special Requests</h2><p>${booking.specialRequests}</p>` : ""}
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendCustomerConfirmation(
  booking: BookingFormData,
  orderSummary: OrderSummary,
  orderId: string
) {
  const customerItemsList = orderSummary.items
    .map(
      (item) =>
        `<li>${item.product.name} x${item.quantity} (${item.nights} nights) - $${(
          calculateItemPrice(item.product, item.nights) * item.quantity
        ).toFixed(2)}</li>`
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: `Order Confirmed! Magical Slumber Orlando #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Magical Slumber Orlando</h1>
        </div>

        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1e3a8a;">Thank you for your order, ${booking.firstName}!</h2>
          <p>Your order has been confirmed and we're preparing your items for delivery.</p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order Number:</strong> ${orderId}</p>

            <h3 style="color: #1e3a8a;">Delivery Details</h3>
            <p><strong>Resort:</strong> ${booking.resortName}</p>
            <p><strong>Room:</strong> ${booking.roomNumber}</p>
            <p><strong>Delivery Date:</strong> ${booking.checkInDate}</p>
            <p><strong>Delivery Time:</strong> ${booking.deliveryTime}</p>
            <p><strong>Pickup Date:</strong> ${booking.checkOutDate}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a;">Items Ordered</h3>
            <ul>${customerItemsList}</ul>

            <hr style="margin: 20px 0;">

            <p><strong>Subtotal:</strong> $${orderSummary.subtotal.toFixed(2)}</p>
            <p><strong>Delivery Fee:</strong> $${orderSummary.deliveryFee.toFixed(2)}</p>
            <p><strong>Security Deposit:</strong> $${orderSummary.deposit.toFixed(2)} (refundable upon return)</p>
            <p style="font-size: 18px;"><strong>Total Charged:</strong> $${orderSummary.total.toFixed(2)}</p>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Important Information</h3>
            <ul>
              <li>Your $${orderSummary.deposit.toFixed(2)} security deposit will be refunded within 5-7 business days after items are returned in good condition.</li>
              <li>Please have items ready for pickup on your checkout date.</li>
              <li>Contact us if you need to modify your order.</li>
            </ul>
          </div>

          <p>Questions? Reply to this email or contact us at <a href="mailto:magicalslumberorlando@gmail.com">magicalslumberorlando@gmail.com</a></p>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Thank you for choosing Magical Slumber Orlando!<br>
            We hope you have a magical, well-rested vacation!
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
