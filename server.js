if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: '.env.local'
    });
}
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY)

//CROS対応（あくまでデモ用）
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*")
    next();
})

app.listen(3000, () => {
    console.log("Start on port 3000.")
})

// Payment Intent作成
app.post('/intent', async (req, res) => {
    const amount = req.body.amount || 1099
    const currency = req.body.currency || 'usd'
    try {
        const customerId = await (async () => {
          if (req.body.customer_id)
            return req.body.customer_id;
          const customer = await stripe.customers.create();
          return customer.id;
        })();
        const ephemeralKey = await stripe.ephemeralKeys.create(
          { customer: customerId },
          { apiVersion: '2020-08-27' },
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        })
        res.status(200).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customerId,
        })
    } catch (e) {
        console.log(e)
        console.log(e.code)
        res.status(e.statusCode || 500).json({
            code: e.code,
            message: e.message,
        })
    }  
})

app.post('/subscription', async (req, res) => {
    const customerId = await (async () => {
      if (req.body.customer_id)
        return req.body.customer_id;
      const customer = await stripe.customers.create();
      return customer.id;
    })();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2020-08-27' },
    );
    const subscription = await stripe.subscriptions.create({
        items: [{
            price: req.body.price_id || process.env.SUBSCRIPTION_PRICE_ID,
            quantity: 1,
        }],
        customer: customerId,
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
    })
    res.status(200).json({
        subscriptionId: subscription.id,
        ephemeralKey: ephemeralKey.secret,
        customer: customerId,
        paymentIntent: subscription.latest_invoice.payment_intent.client_secret,
    })
})

app.post('/checkout-session', async (req, res) => {
    try{
        /**
         * https://stripe.com/docs/payments/accept-a-payment?platform=ios
         */
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: req.body.items.map(item => ({
                price_data: {
                unit_amount: item.amount || 1099,
                currency: item.currency || 'usd',
                product_data: {
                    name: item.name
                }
                },
                quantity: item.quantity || 1,
                adjustable_quantity: {
                enabled: true,
                maximum: 10,
                minimum: 1,
                }
            })),
            success_url: 'http://localhost:8100?success&session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:8100/',
            mode: 'payment',
        });
        res.status(200).json({
            url: checkoutSession.url,
        })
    } catch (e) {
        console.log(e)
        console.log(e.code)
        res.status(e.statusCode || 500).json({
            code: e.code,
            message: e.message,
        })
    } 
})