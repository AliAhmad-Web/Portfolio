// Minimal Vercel serverless function
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  try {
    const path = (req.url || '').split('?')[0];

    // Root / health
    if (path === '/' || path.endsWith('/api')) {
      res.status(200).json({ success: true, message: 'API is running' });
      return;
    }

    // POST contact
    if (path.includes('contact') && req.method === 'POST') {
      const { name, email, message } = req.body || {};
      if (!name || !email || !message) {
        res.status(400).json({ success: false, message: 'All fields required' });
        return;
      }

      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        res.status(500).json({ success: false, message: 'Supabase not configured' });
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { error } = await supabase.rpc('insert_contact_message', {
        p_name: name.trim(),
        p_email: email.trim(),
        p_message: message.trim(),
      });

      if (error) {
        console.error('Supabase error:', error);
        res.status(500).json({ success: false, message: 'Failed to save message' });
        return;
      }

      res.status(201).json({ success: true, message: 'Message sent!' });
      return;
    }

    res.status(404).json({ success: false, message: `Not found: ${path}` });
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
}