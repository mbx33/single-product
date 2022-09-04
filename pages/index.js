import Head from 'next/head';
import styled from 'styled-components';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="project starter" content="Starter Project Skeleton" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Wrapper>
				<h1>Hello World</h1>
			</Wrapper>
		</div>
	);
}

const Wrapper = styled.div`
	background-color: limegreen;
	color: #fff;
	text-align: center;
`;
