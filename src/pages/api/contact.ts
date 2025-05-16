// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { from, subject, message } = req.body;
  if (!from || !subject || !message) return res.status(400).json({ error: 'Missing fields' });

  // createTransport without host/port—Gmail knows defaults
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // 1) send to you
    await transporter.sendMail({
      from,
      to: process.env.GMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      text: message,
    });

    // 2) confirmation back to sender
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: from,
      subject: 'Thanks for reaching out!',
      html: `
        <p>Hey there!</p>
        <p>Thanks for contacting me—I’ve got your message and will get back to you soon.</p>
        <p>Cheers,<br/>Dhruvil</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
