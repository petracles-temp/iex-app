import React from 'react';
import "rbx/index.css";
import { Section, Title, } from "rbx";
import Searchbar from './Searchbar';

class App extends React.Component {
	render() {
		return (
			<div>
				<Section backgroundColor="light" size="large">
					<Title textColor="dark">Welcome to the IEX App!</Title>
					<Title as="h2" subtitle>
						Use the searchbar below to query for a stock's symbol and learn more about it!
					</Title>
					<Searchbar />
				</Section>
			</div>
		);
	}
}

export default App;
