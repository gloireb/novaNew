const prisma = require('../services/db');

const initiateMomoPayment = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const userId = req.user.id;

    // Create a pending payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        method, // 'M-PESA', 'AIRTEL', 'ORANGE'
        status: 'PENDING',
        reference: `MOMO-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      }
    });

    console.log(`[MOMO INIT] Payment initiated: ${payment.reference} for User ${userId}`);
    console.log(`[MOMO INIT] Amount: ${amount} ${payment.currency} via ${method}`);

    // Simulate API response from provider
    res.status(200).json({
      message: 'Payment initiated. Please check your phone for the USSD prompt.',
      paymentId: payment.id,
      reference: payment.reference
    });

    // In a real scenario, we would trigger a webhook later. 
    // Here we could simulate a delay and then "complete" it, 
    // but for now, we'll wait for the manual webhook hit.
  } catch (error) {
    console.error('[MOMO ERROR]', error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

const momoWebhook = async (req, res) => {
  try {
    const { reference, status } = req.body; // status: 'SUCCESS' or 'FAILED'

    console.log(`[MOMO WEBHOOK] Received for ${reference}: ${status}`);

    const payment = await prisma.payment.update({
      where: { reference },
      data: {
        status: status === 'SUCCESS' ? 'COMPLETED' : 'FAILED'
      }
    });

    // If successful, we might also want to update or create a subscription logic here
    // but we'll stick to basic payment updates for now.

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('[MOMO WEBHOOK ERROR]', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

module.exports = { initiateMomoPayment, momoWebhook };
