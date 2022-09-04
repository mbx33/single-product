import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import styled from 'styled-components';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Our Product</title>
				<meta name="Our Product" content="Product page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<Navbar />
				{children}
				<Footer />
			</Container>
		</>
	);
}

const Container = styled.main`
	width: 90%;
	margin: 0 auto;
	background-color: hsl(240, 100%, 50%, 0.3);
`;
