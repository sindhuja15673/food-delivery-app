require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const router = express.Router();

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

// Route for creating a Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { cart } = req.body; // Cart data sent from the frontend
  
  // Map cart items to Stripe line items
  const line_items = cart.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.img], // Image URL for the product
      },
      unit_amount: item.price * 100, // Stripe expects the price in cents
    },
    quantity: item.quantity,
  }));

  try {
    // Create the Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/cart`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    // Respond with the session ID to redirect the frontend to Stripe's checkout
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;


