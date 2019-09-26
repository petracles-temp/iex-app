import React from 'react';
import "rbx/index.css";
import { Field, Control, Input, Button, Help } from "rbx";

interface Props {
    searchQuery: string
}

class Searchbar extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchQuery: ""
        };
    }
    
    // searchSymbol = () => {
    //     console.log("SEARCH HAS BEEN PRESSED")
    // };

	render() {
		return (
			<div>
                <Field kind="addons">
                    <Control expanded>
                        <Input type="search" size="large" placeholder="Search for a stock's symbol..." />
                    </Control>
                    <Control>
                        <Button color="dark" size="large" onClick={console.log("SEARCH HAS BEEN PRESSED")}>Submit</Button>
                    </Control>
                </Field>
                <Help>This searchbar uses the IEX to find any direct or close-matching results</Help>
			</div>
		);
	}
}

export default Searchbar;
