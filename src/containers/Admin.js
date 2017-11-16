import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { invokeApig } from '../libs/awsLib'
// import './Admin.css';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: []
    };
  }

  async componentDidMount() {
    try {
      const results = await this.posts();
      this.setState({ posts: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  posts() {
    return invokeApig({ path: '/posts' });
  }

  renderPostsList(posts) {
  return [{}].concat(posts).map(
    (post, i) =>
      i !== 0
        ? <ListGroupItem
            key={post.postId}
            href={`/posts/${post.postId}`}
            onClick={this.handleNoteClick}
            header={post.content.trim().split("\n")[0]}
          >
            {"Created: " + new Date(post.createdAt).toLocaleString()}
          </ListGroupItem>
        : <ListGroupItem
            key="new"
            href="/posts/new"
            onClick={this.handleNoteClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new post
            </h4>
          </ListGroupItem>
  );
}

handleNoteClick = event => {
  event.preventDefault();
  this.props.history.push(event.currentTarget.getAttribute("href"));
}

  render() {
    return (
      <div className="Admin">
        <h1>Posts</h1>
        <ListGroup>
          {!this.state.isLoading && this.renderPostsList(this.state.posts)}
        </ListGroup>
      </div>
    );
  }
}