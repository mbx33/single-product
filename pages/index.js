import styled from 'styled-components';
import Layout from '../components/Layout';
import Product from '../views/Product';

export default function Home() {
	return (
		<MainContainer>
			<Layout>
				<Wrapper>
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
	color: #fff;
	font-size: 3rem;
	text-align: center;
`;
