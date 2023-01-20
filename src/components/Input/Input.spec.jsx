import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '.';

describe('<Input />', () => {
	it('Should call handleChange function on each key pressed', () => {
		const fn = jest.fn();

		render(<Input fnChange={fn} value="testando" />);

		expect(screen.getByPlaceholderText(/type your search/i).value).toBe('testando');
	});

	it('Should have a value of search', () => {
		const fn = jest.fn();

		render(<Input fnChange={fn} value="um valor qualquer" />);

		const input = screen.getByPlaceholderText(/type your search/i);
		const val = 'o valor';

		userEvent.type(input, val);

		expect(input.value).toBe('um valor qualquer');
		expect(fn).toHaveBeenCalledTimes(val.length);
	});

	it('Should match snapshot', () => {
		const fn = jest.fn();

		const { container } = render(<Input fnChange={fn} value="testando" />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
