import React from 'react';
import "rbx/index.css";
import { Field, Control, Label, Input, Help, Button } from "rbx";

interface MyProps {
    fetchStocks?: any;
    query?: string;
}

interface MyState {
    fetchStocks?: any;
    query?: string;
}

class Searchbar extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            fetchStocks: this.props.fetchStocks,
            query: this.props.query
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({
            query: event.target.value
        });
      }

	render() {
		return (
			<div>
                <Field kind="addons">
                    <Control expanded>
                        <Input type="search" size="large" placeholder="Search for a stock's symbol..." onChange={this.handleChange} />
                    </Control>
                    <Control>
                        <Button color="dark" size="large" onClick={() => this.props.fetchStocks(this.state.query)}>Submit</Button>
                    </Control>
                </Field>
                <Help>This query only accepts <a href="https://iextrading.com/trading/eligible-symbols/">valid, eligible symbols</a> as per the IEX website</Help>
			</div>
		);
	}
}

export default Searchbar;
