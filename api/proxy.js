const GAS_URL = 'https://script.google.com/macros/s/AKfycbyGEs2DhI02dNuZbUCW0kJgZJDNAUWoCs9eRuKmnjnFBAPq76wBe1mt81yf-Bj9J7MH/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let response;
    if (req.method === 'GET') {
      const params = new URLSearchParams(req.query).toString();
      response = await fetch(GAS_URL + (params ? '?' + params : ''), { redirect: 'follow' });
    } else {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      response = await fetch(GAS_URL, {
        method: 'POST', redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body
      });
    }
    const text = await response.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
