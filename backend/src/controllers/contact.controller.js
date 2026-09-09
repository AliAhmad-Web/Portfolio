import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse, sendResponse } from '../utils/ApiResponse.js';
import { contactService } from '../services/contact.service.js';
import { emailService } from '../services/email.service.js';
import { invalidatePortfolioStatsCache } from '../services/portfolioStats.service.js';

export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.',
    });
  }

  const saved = await contactService.createMessage({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  invalidatePortfolioStatsCache();

  // Email must not block or reverse a successful DB save
  const emailResult = await emailService.sendContactNotification({
    name: saved.name,
    email: saved.email,
    message: saved.message,
    submittedAt: saved.createdAt || new Date().toISOString(),
  });

  if (!emailResult.sent && !emailResult.skipped) {
    console.warn(
      '[contact] Message saved but admin email notification failed:',
      emailResult.error,
    );
  }

  const response = ApiResponse.created('Message sent successfully!', {
    ...saved,
    emailNotification: {
      sent: emailResult.sent,
      skipped: Boolean(emailResult.skipped),
    },
  });
  sendResponse(res, response);
});

export const listContacts = asyncHandler(async (req, res) => {
  const contacts = await contactService.listContacts({
    search: req.query.search,
    status: req.query.status,
    limit: req.query.limit,
  });

  sendResponse(
    res,
    ApiResponse.ok('Contacts retrieved', {
      contacts,
      count: contacts.length,
    }),
  );
});

export const getContactById = asyncHandler(async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);

  sendResponse(res, ApiResponse.ok('Contact retrieved', { contact }));
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await contactService.updateContactStatus(
    req.params.id,
    req.body.status,
  );

  invalidatePortfolioStatsCache();
  sendResponse(res, ApiResponse.ok('Contact status updated', { contact }));
});

export const getDashboardOverview = asyncHandler(async (_req, res) => {
  const overview = await contactService.getDashboardStats();

  sendResponse(res, ApiResponse.ok('Dashboard overview retrieved', overview));
});
