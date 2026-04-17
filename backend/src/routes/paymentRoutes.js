const express = require('express');
const { initiateMomoPayment, momoWebhook } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/momo/initiate', authenticate, initiateMomoPayment);
router.post('/momo/webhook', momoWebhook); // webhook is public usually with secret key verification

module.exports = router;
