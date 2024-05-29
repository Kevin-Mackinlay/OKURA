const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

console.log('Stripe Key in stripe.js:', process.env.STRIPE_KEY);

router.post('/payment', async (req, res) => {
  const { tokenId, amount } = req.body;
  if (!tokenId || !amount) {
    return res.status(400).json({ message: 'Payment token and amount are required' });
  }
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    });
    res.status(200).json(charge);
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json(error);
  }
});

module.exports = router;
