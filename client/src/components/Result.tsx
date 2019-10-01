import React from 'react';
import "rbx/index.css";
import { Box } from "rbx";

interface MyProps {
    symbol?: string;
    price?: number;
}

interface MyState {
    symbol?: string;
    price?: number;
}

class Result extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            symbol: this.props.symbol,
            price: this.props.price,
        };
    }

    render() {
        return (
            <div>
                <Box>
                    <p>
                        <strong>{this.state.symbol}</strong> <br />
                        Price: ${this.state.price}
                    </p>
                </Box>
            </div>
        );
    }
}

export default Result;
