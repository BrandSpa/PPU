'use strict';
const React = require('react');
const request = require('superagent');
const Post = require('posts/post');
const Filters = require('../filters');

module.exports = React.createClass({

  getInitialState() {
    return {
      posts: [],
      filters: {
        the_actual_ch: 0,
        the_actual_co: 0,
        paginate: 0
      }
    }
  },

  componentDidMount() {
    this.fetch(this.state.filters)
  },

  fetch() {
    request
    .get('/api/posts')
    .query(this.state.filters)
    .end((err, res) => this.setState({posts: res.body}));
  },

  seeMore(e) {
    e.preventDefault();
    const filters = _.extend(this.state.filters, {paginate: (this.state.filters.paginate + 20)});
    request
    .get('/api/posts')
    .query(filters)
    .end((err, res) => this.setState({posts: this.state.posts.concat(res.body)}));
  },

  filter(filters) {
    var filters = _.extend(this.state.filters, filters);
    request
    .get('/api/posts')
    .query(filters)
    .end((err, res) => this.setState({posts: res.body}));
  },

  render() {
    const posts = this.state.posts.map(post => <Post post={post} key={post.id} fetch={this.fetch} />);

    return (
      <div className="panel">
      <div className="panel-heading">
        <h4>Noticias</h4>
      </div>
      <div className="panel-body">
      <Filters onFilter={this.filter} />
      <br/>
         <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
            {posts}
            </tbody>
          </table>
        </div>
        <a href="#" className="btn btn-primary" onClick={this.seeMore}>Ver Más</a>
      </div>
      </div>

    )
  }
});
