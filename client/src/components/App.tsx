import React from 'react';
import "rbx/index.css";
import { Hero, Section, Container, Title, Field, Control, Input, Button, Help, Box, Column } from "rbx";
import Searchbar from './Searchbar';
import Result from './Result';

interface MyProps {
	allStocks?: Map<string, number>,
	results?: JSX.Element[];
    lastCacheRefresh?: number;
}

interface MyState {
	allStocks?: Map<string, number>,
    results?: JSX.Element[];
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
					allStocks.set(stock["symbol"], stock["price"]);
				}
				this.setState({
					allStocks: allStocks,
					results: this.state.results,
					lastCacheRefresh: Date.now()
				});
			})
	}

	fetchStocks(query: string) {
		// Empty the current results
		this.setState({
			allStocks: this.state.allStocks,
			results: [],
			lastCacheRefresh: this.state.lastCacheRefresh
		});

		// Don't do nothin' if it's an empty query
		if (query === undefined || query.length == 0) {
			console.log("EMPTY QUERY")
			return
		}

		// Otherwise, query the symbol(s) and build the results
		let results: JSX.Element[] = [];
		fetch("http://localhost:8081/" + query)
            .then(response => response.json())
            .then(data => {
                for (let stock of JSON.parse(data)) {
					// Use the distinct "symbol" & "price" for distinct keys in the results array
					results.push(<Result key={stock["symbol"]} symbol={stock["symbol"]} price={stock["price"]} />)
					results.push(<br key={stock["price"]} />)
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
						<br />
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
