import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from './Home';
import userEvent from '@testing-library/user-event';

const handlers = [
	rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
		console.log('A chamada foi interceptada');
		return res(
			ctx.json([
				{
					userId: 1,
					id: 1,
					title: 'title one',
					body: 'body one',
					url: 'img1.jpg',
				},
				{
					userId: 2,
					id: 2,
					title: 'title two',
					body: 'body two',
					url: 'img2.jpg',
				},
				{
					userId: 3,
					id: 3,
					title: 'title three',
					body: 'body three',
					url: 'img3.jpg',
				},
			]),
		);
	}),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('Should render search, posts and load more', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não existem Posts');

		expect.assertions(3);

		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/type your search/i);
		expect(search).toBeInTheDocument();

		const images = screen.getAllByRole('img', { name: /title/i });
		expect(images).toHaveLength(2);

		const button = screen.getByRole('button', { name: /load more posts/i });
		expect(button).toBeInTheDocument();
	});

	it('Should search for posts', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não existem Posts');

		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/type your search/i);

		expect.assertions(10);

		expect(screen.getByRole('heading', { name: 'title one' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'title two' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title three' })).not.toBeInTheDocument();

		userEvent.type(search, 'title one');

		expect(screen.getByRole('heading', { name: 'title one' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title two' })).not.toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'title three' })).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Search value: title one' })).toBeInTheDocument();

		userEvent.clear(search);

		expect(screen.getByRole('heading', { name: 'title one' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'title two' })).toBeInTheDocument();

		userEvent.type(search, 'asiudkjh');

		expect(screen.getByText('Não existem Posts')).toBeInTheDocument();
	});

	it('Should load more posts', async () => {
		render(<Home />);

		const noMorePosts = screen.getByText('Não existem Posts');

		// expect.assertions(3);

		await waitForElementToBeRemoved(noMorePosts);

		const button = screen.getByRole('button', { name: /load more posts/i });
		userEvent.click(button);

		expect(screen.getByRole('heading', { name: 'title three' })).toBeInTheDocument();
		expect(button).toBeDisabled();
	});
});
