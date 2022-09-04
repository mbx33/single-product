import Stripe from 'stripe';
const privateKey = process.env.REACT_APP_STRIPE_PRIVATE_KEY;
const stripe = new Stripe(privateKey);

// const stripe = require('stripe')(privateKey);

const redirectURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'http://localhost:3000';

const transformedItem = {
	price_data: {
		currency: 'usd',
		product_data: {
			// images:
			name: 'Estee Lauder',
		},
		unit_amount: 150 * 100,
	},
	description: 'quality products',
	quantity: 2,
};

async function CreateStripeSession(req, res) {
	if (req.method === 'POST') {
		try {
			const session = await stripe.checkout.sessions.create({
				mode: 'payment',
				payment_method_types: ['card'],
				line_items: [transformedItem],
				success_url: `${redirectURL}`,
				cancel_url: `${redirectURL}`,
			});

			res.status(200).json({ id: session.id });
			// res.status(200).json({ id: session.id });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).json({ message: 'Method not Allowed' });
	}
}

export default CreateStripeSession;
