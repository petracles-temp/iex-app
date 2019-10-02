import React from 'react';
import "rbx/index.css";
import { Box } from "rbx";

interface MyProps {
    symbol?: string;
    lastSalePrice?: number;
    lastSaleTime?: number;
}

interface MyState {
    symbol?: string;
    lastSalePrice?: number;
    lastSaleTime?: number;
}

class Result extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            symbol: this.props.symbol,
            lastSalePrice: this.props.lastSalePrice,
            lastSaleTime: this.props.lastSaleTime
        };
    }

    render() {
        return (
            <div>
                <Box>
                    <strong>{this.state.symbol}</strong>
                    <ul>
                        <li>Last sale price: ${this.state.lastSalePrice}</li>
                        <li>Last sale time: {new Date(this.state.lastSaleTime).toLocaleString()}</li>
                    </ul>
                </Box>
            </div>
        );
    }
}

export default Result;
