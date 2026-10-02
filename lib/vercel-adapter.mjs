export async function sendResponse(response, res, head = false) {
  res.statusCode = response.status;
  for (const [name, value] of response.headers) res.setHeader(name, value);
  res.end(head ? undefined : Buffer.from(await response.arrayBuffer()));
}

export function toWebRequest(req) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers || {})) {
    if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }
  // Vercel routes by Host. Do not use a caller-supplied forwarded host.
  const host = headers.get('host') || 'localhost';
  const protocol = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) ? 'http' : 'https';
  let body;
  if (!['GET', 'HEAD'].includes(req.method)) {
    body = typeof req.body === 'string' || Buffer.isBuffer(req.body)
      ? req.body : JSON.stringify(req.body ?? {});
  }
  return new Request(new URL(req.url || '/', protocol + '://' + host), {
    method: req.method, headers, body,
  });
}
