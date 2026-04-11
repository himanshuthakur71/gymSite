import nodemailer from 'nodemailer';
import {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS,
	SMTP_FROM
} from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: Number(SMTP_PORT) || 587,
	secure: Number(SMTP_PORT) === 465,
	auth: { user: SMTP_USER, pass: SMTP_PASS }
});

const gymName = 'Fitness Academy Gym';
const accentColor = '#ff8f00';

function baseTemplate(content: string) {
	return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif}
  .wrap{max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)}
  .header{background:${accentColor};padding:24px 32px;text-align:center}
  .header h1{color:#fff;margin:0;font-size:24px;letter-spacing:1px}
  .body{padding:32px}
  .body p{color:#444;line-height:1.7;margin:0 0 16px}
  .btn{display:inline-block;margin-top:8px;padding:12px 28px;background:${accentColor};color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px}
  .badge{display:inline-block;padding:4px 12px;border-radius:4px;font-weight:bold;font-size:13px}
  .badge-success{background:#dcfce7;color:#166534}
  .badge-warn{background:#fef9c3;color:#854d0e}
  .badge-error{background:#fee2e2;color:#991b1b}
  table{width:100%;border-collapse:collapse;margin:16px 0}
  td{padding:10px 12px;border-bottom:1px solid #eee;color:#444;font-size:14px}
  td:first-child{font-weight:bold;color:#222;width:40%}
  .footer{background:#f9f9f9;padding:20px 32px;text-align:center;color:#999;font-size:12px;border-top:1px solid #eee}
</style></head>
<body><div class="wrap">
  <div class="header"><h1>${gymName}</h1></div>
  <div class="body">${content}</div>
  <div class="footer">&copy; ${new Date().getFullYear()} ${gymName}. All rights reserved.</div>
</div></body></html>`;
}

function formatDate(d: string) {
	if (!d) return '-';
	const [y, m, day] = d.split('-').map(Number);
	return new Date(y, m - 1, day).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ─── Welcome Email ───────────────────────────────────────────────────────────
export async function sendWelcomeEmail(member: any, planName: string) {
	if (!member?.email) return;
	const html = baseTemplate(`
    <p>Dear <strong>${member.first_name} ${member.last_name}</strong>,</p>
    <p>Welcome to <strong>${gymName}</strong>! We're thrilled to have you as a member. Your fitness journey starts today!</p>
    <table>
      <tr><td>Member ID</td><td>${member.id}</td></tr>
      <tr><td>Plan</td><td>${planName || member.fee_pm}</td></tr>
      <tr><td>Batch</td><td>${member.gym_time}</td></tr>
      <tr><td>Joining Date</td><td>${formatDate(member.joining_date)}</td></tr>
      <tr><td>Valid Until</td><td>${formatDate(member.end_date)}</td></tr>
    </table>
    <p>If you have any questions, feel free to visit us or contact us anytime.</p>
    <p>Stay strong, stay consistent!</p>
  `);
	await transporter.sendMail({
		from: `"${gymName}" <${SMTP_FROM}>`,
		to: member.email,
		subject: `Welcome to ${gymName}! 🏋️`,
		html
	});
}

// ─── Expiry Warning (N days before) ─────────────────────────────────────────
export async function sendExpiryWarning(member: any, daysLeft: number) {
	if (!member?.email) return;
	const html = baseTemplate(`
    <p>Dear <strong>${member.first_name} ${member.last_name}</strong>,</p>
    <p>This is a friendly reminder that your gym membership will expire in <strong>${daysLeft} day${daysLeft !== 1 ? 's' : ''}</strong>.</p>
    <table>
      <tr><td>Member ID</td><td>${member.id}</td></tr>
      <tr><td>Expiry Date</td><td>${formatDate(member.end_date)}</td></tr>
      <tr><td>Batch</td><td>${member.gym_time}</td></tr>
    </table>
    <p>Please renew your membership at the gym to continue your fitness journey without interruption.</p>
  `);
	await transporter.sendMail({
		from: `"${gymName}" <${SMTP_FROM}>`,
		to: member.email,
		subject: `Your membership expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} — ${gymName}`,
		html
	});
}

// ─── Membership Expired ──────────────────────────────────────────────────────
export async function sendExpiredNotification(member: any) {
	if (!member?.email) return;
	const html = baseTemplate(`
    <p>Dear <strong>${member.first_name} ${member.last_name}</strong>,</p>
    <p>Your gym membership has <span class="badge badge-error">Expired</span> on <strong>${formatDate(member.end_date)}</strong>.</p>
    <p>We miss you at the gym! Please visit us to renew your membership and get back to your fitness routine.</p>
    <p>We have exciting new plans and batches available. Come talk to us!</p>
  `);
	await transporter.sendMail({
		from: `"${gymName}" <${SMTP_FROM}>`,
		to: member.email,
		subject: `Your membership has expired — ${gymName}`,
		html
	});
}

// ─── Payment Due Reminder ────────────────────────────────────────────────────
export async function sendPaymentDueNotification(member: any) {
	if (!member?.email) return;
	const html = baseTemplate(`
    <p>Dear <strong>${member.first_name} ${member.last_name}</strong>,</p>
    <p>This is a reminder that you have a pending payment at <strong>${gymName}</strong>.</p>
    <table>
      <tr><td>Total Fee</td><td>₹${member.fee_pm}</td></tr>
      <tr><td>Amount Paid</td><td>₹${member.fee_received}</td></tr>
      <tr><td>Amount Due</td><td><strong style="color:#dc2626">₹${member.due_amount}</strong></td></tr>
    </table>
    <p>Please clear your dues at the earliest to avoid any disruption to your membership.</p>
  `);
	await transporter.sendMail({
		from: `"${gymName}" <${SMTP_FROM}>`,
		to: member.email,
		subject: `Payment due of ₹${member.due_amount} — ${gymName}`,
		html
	});
}

// ─── Contact Form Enquiry ────────────────────────────────────────────────────
export async function sendContactEmail(fields: {
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	message: string;
	subject?: string;
}) {
	const html = baseTemplate(`
    <p>You have received a new enquiry via the website contact form.</p>
    <table>
      <tr><td>Name</td><td>${fields.first_name} ${fields.last_name}</td></tr>
      <tr><td>Email</td><td>${fields.email}</td></tr>
      <tr><td>Phone</td><td>${fields.phone}</td></tr>
      <tr><td>Message</td><td>${fields.message.replace(/\n/g, '<br>')}</td></tr>
    </table>
  `);
	await transporter.sendMail({
		from: `"${gymName} Website" <${SMTP_FROM}>`,
		to: SMTP_FROM,
		replyTo: fields.email,
		subject: fields.subject || `New Enquiry from ${fields.first_name} ${fields.last_name}`,
		html
	});
}

// ─── Announcement Broadcast ──────────────────────────────────────────────────
export async function sendAnnouncement(emails: string[], title: string, message: string) {
	if (!emails.length) return;
	const html = baseTemplate(`
    <p><strong>📢 ${title}</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `);
	// Send in batches of 50 to avoid SMTP limits
	for (let i = 0; i < emails.length; i += 50) {
		const batch = emails.slice(i, i + 50);
		await transporter.sendMail({
			from: `"${gymName}" <${SMTP_FROM}>`,
			bcc: batch,
			subject: `${title} — ${gymName}`,
			html
		});
	}
}
