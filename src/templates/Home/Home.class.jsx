import { Component } from "react";

import "./styles.css";

export class HomeClass extends Component {
	state = {
		counter: 0,
	};

	handleClick = () => {
		this.setState(
			(prevState, prevProps) => {
				console.log("Props: ", prevProps.numToIncrement);
				return { counter: prevState.counter + prevProps.numToIncrement };
			},
			() => {
				console.log("PostState: ", this.state.counter);
			}
		);
	};

	render() {
		return (
			<div className="container">
				<h1>{this.state.counter}</h1>
				<button onClick={this.handleClick}>Increment</button>
			</div>
		);
	}
}
