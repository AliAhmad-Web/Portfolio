import { createClient } from '@supabase/supabase-js';

// CORS headers for Vercel serverless functions
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function handleContactForm(body) {
  const { name, email, message } = body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      status: 400,
      body: { success: false, message: 'Name, email, and message are required.' },
    };
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      status: 500,
      body: {
        success: false,
        message: 'Server configuration error. Contact form is not available.',
      },
    };
  }

  const { data, error } = await supabase.rpc('insert_contact_message', {
    p_name: name.trim(),
    p_email: email.trim(),
    p_message: message.trim(),
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return {
      status: 500,
      body: { success: false, message: 'Failed to save message. Please try again.' },
    };
  }

  return {
    status: 201,
    body: { success: true, message: 'Message sent successfully!', data },
  };
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Set CORS headers on all responses
  const headers = {
    'Content-Type': 'application/json',
    ...corsHeaders,
  };

  try {
    // Vercel may pass the original URL or the rewrite destination URL
    // Handle both cases by checking the path suffix
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const path = url.pathname;

    // Health check — matches /api, /api/ or any path ending with /api or /api/
    if (path === '/api' || path === '/api/' || path.endsWith('/api') || path.endsWith('/api/')) {
      res.writeHead(200, headers);
      res.end(JSON.stringify({
        success: true,
        message: 'Portfolio API server is running',
        api: '/api/v1',
      }));
      return;
    }

    // Contact form endpoint — matches /api/v1/contact or /v1/contact
    if ((path.endsWith('/v1/contact') || path === '/v1/contact') && req.method === 'POST') {
      // Read request body
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }

      const parsedBody = JSON.parse(body || '{}');
      const result = await handleContactForm(parsedBody);

      res.writeHead(result.status, headers);
      res.end(JSON.stringify(result.body));
      return;
    }

    // 404 for everything else
    res.writeHead(404, headers);
    res.end(JSON.stringify({
      success: false,
      message: `Route ${url.pathname} not found`,
    }));
  } catch (error) {
    console.error('Serverless function error:', error);
    res.writeHead(500, headers);
    res.end(JSON.stringify({
      success: false,
      message: 'Internal server error',
    }));
  }
}