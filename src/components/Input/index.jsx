import P from 'prop-types';
import './styles.css';

export const Input = ({ fnChange, value }) => {
	return (
		<input placeholder="Type your search" className="text-input" onChange={fnChange} value={value} type="search" />
	);
};

Input.propTypes = {
	fnChange: P.func.isRequired,
	value: P.string.isRequired,
};
