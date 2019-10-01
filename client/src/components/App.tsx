import React from 'react';
import "rbx/index.css";
import { Hero, Section, Container, Title, Field, Control, Input, Button, Help, Box, Column } from "rbx";
// import Searchbar from './Searchbar';
import Result from './Result';

interface MyProps {
    allStocks?: [];
    lastCacheReset?: Date;
}

interface MyState {
    allStocks?: [];
    lastCacheReset?: Date;
}

class App extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
        super(props);
        this.state = {
            allStocks: [],
            lastCacheReset: new Date()
		};
		this.buildResult = this.buildResult.bind(this);
        this.fetchAllStocks = this.fetchAllStocks.bind(this);
	}

	buildResult(value: string, key: number) {
		return <Result symbol={key} price={value} />
	}

	fetchAllStocks() {
		console.log("SEARCH HAS BEEN PRESSED");
        fetch("http://localhost:8081/")
            .then(response => response.json())
            .then(data => {
                let stocks = [];
                for (let stock of JSON.parse(data)) {
					stocks.push(<Result symbol={stock["symbol"]} price={stock["price"]} />)
                }
                this.setState({
                    allStocks: stocks,
                    lastCacheRefresh: Date.now()
                });
			})
		console.log(this.state.allStocks);
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
							<Field kind="addons">
								<Control expanded>
									<Input type="search" size="large" placeholder="Search for a stock's symbol..." />
								</Control>
								<Control>
									<Button color="dark" size="large" onClick={this.fetchAllStocks}>Submit</Button>
								</Control>
							</Field>
							<Help>This searchbar uses the IEX to find its results results</Help>
						</Container>
						<Container>
							{this.state.allStocks}
						</Container>
					</Hero.Body>
				</Hero>
			</div>
		);
	}
}

export default App;
