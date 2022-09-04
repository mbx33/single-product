import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const createCheckoutSession = async () => {
	const stripe = await stripePromise;
	const checkoutSession = await axios.post('/api/create-stripe-session', {
		item: 'this is the item',
	});
	const result = await stripe.redirectToCheckout({
		sessionId: checkoutSession.data.id,
	});
	if (result.error) {
		alert(result.error.message);
	}
};

const Product = () => {
	return (
		<div>
			<h1>This Product</h1>
			<h2>subtitle</h2>
			<p>Description</p>
			<button onClick={createCheckoutSession}>Buy Now</button>
			<p>secure payment</p>
		</div>
	);
};

export default Product;
