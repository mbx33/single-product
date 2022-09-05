import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const Product = () => {
	const [item, setItem] = useState({
		name: 'Estee Lauder',
		description: 'This is the best night Serum',
		available: 11,
		qty: 0,
	});

	const createCheckoutSession = async () => {
		const stripe = await stripePromise;
		const checkoutSession = await axios.post('/api/create-stripe-session', {
			item,
		});
		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});
		if (result.error) {
			alert(result.error.message);
		}
	};

	const handleAdd = () => {
		setItem((prevState) => {
			if (prevState.available !== 0) {
				return {
					...prevState,
					qty: prevState.qty + 1,
					available: prevState.available - 1,
				};
			} else {
				return { ...prevState };
			}
		});
	};

	const handleMinus = () => {
		setItem((prevState) => {
			if (prevState.qty > 0) {
				return {
					...prevState,
					qty: prevState.qty - 1,
					available: prevState.available + 1,
				};
			}
			if (prevState.qty === 0) {
				return { ...prevState };
			}
		});
	};

	return (
		<div>
			<h1>{item.name}</h1>
			<h2>{item.description}</h2>
			<h3>{item.qty}</h3>
			<button onClick={handleMinus}>-</button>
			{item.qty > 0 ? (
				<button onClick={createCheckoutSession}>Buy Now</button>
			) : (
				<button disabled onClick={createCheckoutSession}>
					Buy Now
				</button>
			)}

			<button onClick={handleAdd}>+</button>
			<p>secure payment</p>
			<p>Only {item.available} Left!!</p>
		</div>
	);
};

export default Product;
