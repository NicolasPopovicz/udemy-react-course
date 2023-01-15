import "./styles.css";
import { Component } from "react";

export class Button extends Component {
	render() {
		return (
			<button
				className="button"
				disabled={this.props.disabled}
				onClick={this.props.click}
			>
				{this.props.text}
			</button>
		);
	}
}
