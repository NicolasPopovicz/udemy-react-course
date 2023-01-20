import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

describe('<PostCard />', () => {
	it('Should render <PostCard /> properly', () => {
		render(<PostCard {...postCardPropsMock} />);

		expect(screen.getByRole('img', { name: /title 1/i })).toHaveAttribute('src', 'img/img.png');
		expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
		expect(screen.getByText('body 1')).toBeInTheDocument();
	});

	it('Should match snapshot', () => {
		const { container } = render(<PostCard {...postCardPropsMock} />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
