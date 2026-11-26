import nodemailer from 'nodemailer'

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Validates contact form input and sends notification + auto-reply emails.
 * Returns { status, body } suitable for both Express and Vercel Serverless handlers.
 */
export async function processContactInquiry(payload = {}) {
  const { name, email, role, workMode, service, budget, message } = payload
  const targetRole = role || service || 'Engineering Role'
  const targetMode = workMode || budget || 'Not specified'

  if (!name || !email || !message) {
    return {
      status: 400,
      body: { error: 'Name, email, and message are required.' },
    }
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'vibhudixit88@gmail.com'
  const smtpUser = process.env.SMTP_USER || 'vibhudixit88@gmail.com'
  const smtpPass = process.env.SMTP_PASS

  console.log(`[Form Submission] Received from ${name} <${email}> for ${targetRole} (${targetMode})`)

  if (!smtpPass || smtpPass === 'your_gmail_app_password_here') {
    return {
      status: 200,
      body: {
        success: true,
        mode: 'mock',
        message: 'Inquiry received. (To send live emails, configure SMTP_PASS in environment variables)',
      },
    }
  }

  const cleanPass = smtpPass.trim().replace(/\s+/g, '')
  const port = parseInt(process.env.SMTP_PORT || '465', 10)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: {
      user: smtpUser,
      pass: cleanPass,
    },
  })

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeRole = escapeHtml(targetRole)
  const safeMode = escapeHtml(targetMode)
  const safeMessage = escapeHtml(message)

  const adminMailOptions = {
    from: `"Vibhu Dixit Portfolio" <${smtpUser}>`,
    to: notificationEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `💼 Hiring / Interview Inquiry: ${name} (${targetRole})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #120400; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #ff5722;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #ff8a1f; margin: 0;">New Hiring / Recruiter Inquiry</h2>
          <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0;">Received from your portfolio contact form</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6); width: 140px;">Contact Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6);">Work Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #ff8a1f; text-decoration: none;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6);">Role / Opportunity:</td>
            <td style="padding: 8px 0; color: #ffffff;">${safeRole}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: rgba(255,255,255,0.6);">Work Mode:</td>
            <td style="padding: 8px 0; color: #34d399; font-weight: bold;">${safeMode}</td>
          </tr>
        </table>
        <div style="background: rgba(255,255,255,0.06); padding: 18px; border-radius: 10px; border-left: 3px solid #ff3d00;">
          <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0 0 8px; text-transform: uppercase;">Message / Role Details:</p>
          <p style="color: #ffffff; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
        </div>
      </div>
    `,
  }

  const clientMailOptions = {
    from: `"Vibhu Dixit" <${smtpUser}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}! — Vibhu Dixit`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; padding: 32px; border-radius: 16px; border: 1px solid #e5e7eb;">
        <h2 style="color: #ea580c; margin-top: 0;">Message Received</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #374151;">Hi <strong>${safeName}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6; color: #374151;">
          Thank you for reaching out regarding <strong>${safeRole}</strong> (${safeMode}). I have received your note and will respond within <strong>12 hours</strong>.
        </p>
        <div style="margin: 24px 0; padding: 16px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Summary of your inquiry:</strong><br />
            • Role / Opportunity: ${safeRole}<br />
            • Work Mode: ${safeMode}
          </p>
        </div>
        <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
          You can also connect with me directly on LinkedIn or reach me at +91 7500211114:<br />
          <a href="https://www.linkedin.com/in/vibhu-dixit-b42a11251/" style="color: #ea580c; font-weight: bold; text-decoration: none;">Vibhu Dixit on LinkedIn &rarr;</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="font-size: 13px; color: #6b7280; margin: 0;">
          Best regards,<br />
          <strong>Vibhu Dixit</strong><br />
          Associate AI Engineer – Level 2 | B.Tech CS (8.4 CGPA)
        </p>
      </div>
    `,
  }

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ])

  return {
    status: 200,
    body: { success: true, message: 'Inquiry delivered and auto-reply sent successfully.' },
  }
}
