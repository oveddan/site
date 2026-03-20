import type { NextApiRequest, NextApiResponse } from 'next';
import { generateLlmsTxt } from '@/api/llmsContent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const content = await generateLlmsTxt();
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(content);
}
