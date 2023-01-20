import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
	it("Should render the button with text 'Load more'", () => {
		const fn = jest.fn();

		render(<Button text="Load more" click={fn} />);
		expect.assertions(1);

		expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
	});

	it('Should call function on button click', () => {
		const fn = jest.fn();

		render(<Button text="Load more" click={fn} />);

		userEvent.click(screen.getByRole('button', { name: /load more/i }));

		expect(fn).toHaveBeenCalled();
	});

	it('Should be disabled when Disabled is true', () => {
		const fn = jest.fn();

		render(<Button text="Load more" click={fn} disabled={true} />);

		expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled();
	});

	it('Should be enabled when Disabled is true', () => {
		const fn = jest.fn();

		render(<Button text="Load more" click={fn} disabled={false} />);

		expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled();
	});

	it('Should match snapshot', () => {
		const fn = jest.fn();

		const { container } = render(<Button click={fn} text="Load more" />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
