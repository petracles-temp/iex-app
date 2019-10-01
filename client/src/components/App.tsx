import React from 'react';
import "rbx/index.css";
import { Hero, Section, Container, Title, Field, Control, Input, Button, Help, Box, Column } from "rbx";
import Searchbar from './Searchbar';
import Result from './Result';

interface MyProps {
	allStocks?: Map<string, number>,
	results?: Result[];
    lastCacheRefresh?: number;
}

interface MyState {
	allStocks?: Map<string, number>,
    results?: Result[];
    lastCacheRefresh?: number;
}

class App extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
        super(props);
        this.state = {
			allStocks: new Map<string, number>(),
            results: [],
            lastCacheRefresh: 0
		};
		this.fetchAllStocks = this.fetchAllStocks.bind(this);
		this.fetchStocks = this.fetchStocks.bind(this);
		
		this.fetchAllStocks();
	}

	fetchAllStocks() {
		let allStocks: Map<string, number> = new Map<string, number>();
        fetch("http://localhost:8081/")
            .then(response => response.json())
            .then(data => {
                for (let stock of JSON.parse(data)) {
					allStocks.set(stock["symbol"], stock["price"])
				}
				this.setState({
					allStocks: allStocks,
					results: this.state.results,
					lastCacheRefresh: Date.now()
				});
			})
	}

	fetchStocks(query: string) {
		this.setState({
			allStocks: this.state.allStocks,
			results: [],
			lastCacheRefresh: this.state.lastCacheRefresh
		});

		let results: Result[] = [];
		fetch("http://localhost:8081/" + query)
            .then(response => response.json())
            .then(data => {
                for (let stock of JSON.parse(data)) {
					results.push(<Result symbol={stock["symbol"]} price={stock["price"]} />)
					results.push(<br />)
				}
				this.setState({
					allStocks: this.state.allStocks,
					results: results,
					lastCacheRefresh: this.state.lastCacheRefresh
				});
			})
	}
	
	render() {
		return (
			<div>
				<Hero size="large">
					<Hero.Body  backgroundColor="light">
						<Title align="center" textColor="dark">Welcome to the IEX App!</Title>
							<Title align="center" as="h2" subtitle>
								Use the searchbar below to query the IEX using a stock's symbol!
						</Title>
						<br />
						<Container>
							<Searchbar fetchStocks={this.fetchStocks}/>
						</Container>
						<Container>
							{this.state.results}
						</Container>
					</Hero.Body>
				</Hero>
			</div>
		);
	}
}

export default App;
