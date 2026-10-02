import { editorResponse } from '../server.mjs';
import { sendResponse, toWebRequest } from '../lib/vercel-adapter.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendResponse(new Response('Method not allowed', { status: 405 }), res);
  }
  try {
    return sendResponse(await editorResponse(toWebRequest(req)), res);
  } catch {
    return sendResponse(Response.json({ error: 'Invalid request.' }, { status: 400 }), res);
  }
}
