import './styles.css';

import { useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const Home = () => {
	const [postsPerPage] = useState(2);
	const [page, setPage] = useState(0);
	const [posts, setPosts] = useState([]);
	const [allPosts, setAllPosts] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const handleLoadPosts = useCallback(async (page, postsPerPage) => {
		const postsAndPhotos = await loadPosts();

		setPosts(postsAndPhotos.slice(page, postsPerPage));
		setAllPosts(postsAndPhotos);
	}, []);

	const loadMorePosts = () => {
		const nextPage = page + postsPerPage;
		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

		posts.push(...nextPosts);

		setPosts(posts);
		setPage(nextPage);
	};

	const handleChange = (event) => {
		const { value } = event.target;

		setSearchValue(value);
	};

	useEffect(() => {
		handleLoadPosts(0, postsPerPage);
	}, [handleLoadPosts, postsPerPage]);

	const noMorePosts = page + postsPerPage >= allPosts.length;

	const filterPost = searchValue
		? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
		: posts;

	return (
		<section className="container">
			<div className="search-container">
				{!!searchValue && <h1>Search value: {searchValue}</h1>}

				<Input value={searchValue} fnChange={handleChange} />
			</div>

			{filterPost.length > 0 && <Posts posts={filterPost} />}
			{filterPost.length === 0 && <p>Não existem Posts</p>}

			<div className="button-container">
				{!searchValue && <Button disabled={noMorePosts} text="Load more posts" click={loadMorePosts} />}
			</div>
		</section>
	);
};
