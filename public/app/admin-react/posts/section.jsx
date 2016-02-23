'use strict';
var React = require('react');
var Post = require('posts/post.jsx');
var request = require('superagent');
var Filters = require('filters.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      posts: [],
      filters: {
        the_actual_ch: 0,
        the_actual_co: 0,
        paginate: 0
      }
    }
  },

  componentDidMount: function() {
    this.fetch(this.state.filters)
  },

  fetch: function() {
    request
    .get('/api/posts')
    .query(this.state.filters)
    .end(function(err, res) {
      this.setState({posts: res.body})
    }.bind(this));
  },

  seeMore: function(e) {
    e.preventDefault();
    var filters = _.extend(this.state.filters, {paginate: (this.state.filters.paginate + 20)});
    request
    .get('/api/posts')
    .query(filters)
    .end(function(err, res) {
      this.setState({posts: this.state.posts.concat(res.body)})
    }.bind(this));
  },

  filter: function(filters) {
    var filters = _.extend(this.state.filters, filters);
    request
    .get('/api/posts')
    .query(filters)
    .end(function(err, res) {
      this.setState({posts: res.body})
    }.bind(this));
  },

  render: function() {
    var posts = this.state.posts.map(function(post) {
      return (<Post post={post} key={post.id} fetch={this.fetch} />);
    }.bind(this));

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