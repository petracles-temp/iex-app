import React from 'react';
import "rbx/index.css";
import { Field, Control, Input, Button, Help } from "rbx";

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

    handleChange(event) {
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
                <Help>This searchbar uses the IEX to find its results results</Help>
			</div>
		);
	}
}

export default Searchbar;
