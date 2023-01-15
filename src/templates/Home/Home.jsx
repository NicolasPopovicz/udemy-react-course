import "./styles.css";
import { Component } from "react";
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

class Home extends Component {
	state = {
		posts: [],
		allPosts: [],
		page: 0,
		postsPerPage: 10,
		searchValue: "",
	};

	async componentDidMount() {
		await this.loadPosts();
	}

	loadPosts = async () => {
		const { page, postsPerPage } = this.state;

		const postsAndPhotos = await loadPosts();
		this.setState({
			posts: postsAndPhotos.slice(page, postsPerPage),
			allPosts: postsAndPhotos,
		});
	};

	loadMorePosts = () => {
		const { page, postsPerPage, allPosts, posts } = this.state;

		const nextPage = page + postsPerPage;
		const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

		posts.push(...nextPosts);

		this.setState({ posts, page: nextPage });
	};

	handleChange = (event) => {
		const { value } = event.target;

		this.setState({ searchValue: value });
	};

	render() {
		const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
		const noMorePosts = page + postsPerPage >= allPosts.length;

		const filterPost = !!searchValue
			? allPosts.filter((post) =>
					post.title.toLowerCase().includes(searchValue.toLowerCase())
			  )
			: posts;

		return (
			<section className="container">
				<div className="search-container">
					{!!searchValue && <h1>Search value: {searchValue}</h1>}

					<Input value={searchValue} fnChange={this.handleChange} />
				</div>

				{filterPost.length > 0 && <Posts posts={filterPost} />}
				{filterPost.length === 0 && <p>Não existem Posts</p>}

				<div className="button-container">
					{!searchValue && (
						<Button
							disabled={noMorePosts}
							text="Load more posts"
							click={this.loadMorePosts}
						/>
					)}
				</div>
			</section>
		);
	}
}

export default Home;
