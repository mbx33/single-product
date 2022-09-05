const privateKey = process.env.STRIPE_PRIVATE_KEY;
const stripe = require('stripe')(privateKey);

const redirectURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3000'
		: 'http://localhost:3000';

async function CreateStripeSession(req, res) {
	const { name, description, available, qty } = req.body.item;

	console.log(name, description, qty, 'values from deconstruct');

	const transformedItem = {
		price_data: {
			currency: 'usd',
			product_data: {
				// images:
				name,
			},
			unit_amount: 150 * 100,
		},
		description,
		quantity: qty,
	};

	if (req.method === 'POST') {
		try {
			const session = await stripe.checkout.sessions.create({
				mode: 'payment',
				payment_method_types: ['card'],
				line_items: [transformedItem],
				success_url: `${redirectURL}/?success=true`,
				cancel_url: `${redirectURL}/?canceled=true`,
			});

			// res.redirect(303, session.url);
			res.status(200).json({ id: session.id });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).json({ message: 'Method not Allowed' });
	}
}

export default CreateStripeSession;
