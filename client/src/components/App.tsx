import React from 'react';
import "rbx/index.css";
import { Hero, Section, Container, Title, Footer} from "rbx";
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
					allStocks.set(stock["symbol"], stock["lastSalePrice"]);
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

		if (query === undefined || query.length == 0) {
			console.log("EMPTY QUERY")
			return
		}

		let results: JSX.Element[] = [];
		fetch("http://localhost:8081/" + query)
            .then(response => response.json())
            .then(data => {
				let i = 0
                for (let stock of JSON.parse(data)) {
					results.push(
						<Result
							key={i++}
							symbol={stock["symbol"]}
							lastSalePrice={stock["lastSalePrice"]}
							lastSaleTime={stock["lastSaleTime"]}
						/>)
					results.push(<br key={i++} />)
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
				<Hero size="small">
					<Hero.Body  backgroundColor="dark">
						<Title align="left" textColor="light">Welcome to the IEX App!</Title>
						<Title align="left" as="h4" subtitle textColor="white">
							A <a href="https://github.com/petracles-temp/iex-app">small side project</a> made by Jack Kelly
						</Title>
					</Hero.Body>
				</Hero>
				<Section size="medium" backgroundColor="light">
					<Container>
						<Title textColor="dark">Query the IEX:</Title>
						<Searchbar fetchStocks={this.fetchStocks}/>
					</Container>
					<br />
					<Container>
						{this.state.results}
					</Container>
				</Section>
				<Footer backgroundColor="light">
					<Container>
						<Title size={6}>
							Data provided for free by <a href="https://iextrading.com/developer/">IEX</a>.
							View <a href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use.</a>
						</Title>
					</Container>
				</Footer>
			</div>
		);
	}
}

export default App;
