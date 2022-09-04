import styled from 'styled-components';
import Layout from '../components/Layout';
import Product from '../views/Product';

export default function Home() {
	return (
		<MainContainer>
			<Layout>
				<Wrapper>
					<h1>Hello World</h1>
					<Product />
				</Wrapper>
			</Layout>
		</MainContainer>
	);
}

const MainContainer = styled.div`
	background-color: #222;
`;

const Wrapper = styled.div`
	background-color: limegreen;
	color: #fff;
	text-align: center;
`;
