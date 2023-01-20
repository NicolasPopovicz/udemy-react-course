import P from 'prop-types';
import './styles.css';

export const Button = ({ text, click, disabled = false }) => {
	return (
		<button className="button" disabled={disabled} onClick={click}>
			{text}
		</button>
	);
};

Button.defaultProps = {
	disabled: false,
};

Button.propTypes = {
	text: P.string.isRequired,
	click: P.func.isRequired,
	disabled: P.bool,
};
