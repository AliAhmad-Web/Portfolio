import { supabaseAnon } from '../config/supabase.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../utils/ApiResponse.js';

export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.',
    });
  }

  // Save to Supabase database using SECURITY DEFINER function (bypasses RLS)
  const { data, error } = await supabaseAnon.rpc('insert_contact_message', {
    p_name: name.trim(),
    p_email: email.trim(),
    p_message: message.trim(),
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save message. Please try again.',
    });
  }

  const response = ApiResponse.created('Message sent successfully!', data);
  sendResponse(res, response);
});