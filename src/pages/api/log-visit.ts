// pages/api/log-visit.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url, userAgent, isBot, timestamp } = req.body;
    // Process and store the log data (e.g., to a database, a logging service, or console for now)
    console.log('Visit Logged:', { url, userAgent, isBot, timestamp });
    res.status(200).json({ message: 'Visit logged successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}