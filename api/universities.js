import { universityResponse } from '../server.mjs';
import { sendResponse } from '../lib/vercel-adapter.mjs';

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return sendResponse(new Response('Method not allowed', { status: 405 }), res);
  }
  return sendResponse(await universityResponse(), res, req.method === 'HEAD');
}
