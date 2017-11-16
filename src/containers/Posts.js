import React, { Component } from 'react';
import { invokeApig, s3Upload } from '../libs/awsLib';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
// import './Posts.css';


export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      post: null,
      content: ""
    };
  }

  async componentDidMount() {
    try {
      const results = await this.getPost();
      this.setState({
        post: results,
        content: results.content
      });
    } catch (e) {
      alert(e);
    }
  }

  getPost() {
    return invokeApig({ path: `/posts/${this.props.match.params.id}` });
  }

  validateForm() {
  return this.state.content.length > 0;
}

formatFilename(str) {
  return str.length < 50
    ? str
    : str.substr(0, 20) + "..." + str.substr(str.length - 20, str.length);
}

handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleFileChange = event => {
  this.file = event.target.files[0];
}

savePost(post) {
  return invokeApig({
    path: `/posts/${this.props.match.params.id}`,
    method: 'PUT',
    body: post
  });
}

handleSubmit = async event => {
  let uploadedFilename;

  event.preventDefault();

  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert("Please pick a file smaller than 5MB");
    return;
  }

  this.setState({ isLoading: true });

  try {
    if (this.file) {
      uploadedFilename = (await s3Upload(this.file)).Location;
    }

    await this.savePost({
      ...this.state.post,
      content: this.state.content,
      attachment: uploadedFilename || this.state.post.attachment
    });
    this.props.history.push('/admin');
  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
}

deletePost() {
  return invokeApig({
    path: `/posts/${this.props.match.params.id}`,
    method: 'DELETE'
  });
}

handleDelete = async event => {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmed) {
    return;
  }

  this.setState({ isDeleting: true });

  try {
    await this.deletePost();
    this.props.history.push("/admin");
  } catch (e) {
    alert(e);
    this.setState({ isDeleting: false });
  }
}

render() {
  return (
    <div className="Posts">
      {this.state.post &&
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          {this.state.post.attachment &&
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.state.post.attachment}
                >
                  {this.formatFilename(this.state.post.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>}
          <FormGroup controlId="file">
            {!this.state.post.attachment &&
              <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>}
    </div>
  );
}
}