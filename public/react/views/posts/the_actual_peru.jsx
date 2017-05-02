'use strict';
import React from 'react';
import request from 'superagent';
import _ from 'lodash';
import Waypoint from 'react-waypoint';
import Post from 'views/posts/post.jsx';
import Lawyer from 'views/lawyers/lawyer.jsx';
import PostFeatured from 'views/posts/post_featured.jsx';
import TopBar from 'views/top_bar.jsx';
import trans from 'langs/app';

export default React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      lawyers: [],
      filtersLaywyers: {
        published: 1,
        order_by_spanish: '',
        paginate: 0
      },
      filters: {
        featured_order: 'ASC',
        published: 1,
        the_actual_ch: 0,
        the_actual_co: 0,
        the_actual_pe: 1,
        paginate: 0
      },
      loaded: false
    }
  },

  componentDidMount: function() {
    this.fetch();
  },

  fetch: function(filters) {
    var query = _.extend(this.state.filters, {paginate: 0});

    request
      .get('/api/posts')
      .query(query)
      .end(function(err, res) {
        this.setState({
          posts: res.body,
          loaded: true
        });
      }.bind(this));
  },

  fetchLawyers: function() {
    var query = _.extend(this.state.filtersLaywyers, {paginate: 0});

    request
      .get('/api/lawyers')
      .query(query)
      .end(function(err, res) {
        this.setState({
          lawyers: res.body,
          loaded: true
        });
      }.bind(this));
  },

  loadMore: function() {
    var query = this.state.filters;
    query = _.extend(query, {paginate: query.paginate + 20})

    request
    .get('/api/posts')
    .query(query)
    .end(function(err, res) {
      this.setState({
      posts: this.state.posts.concat(res.body),
      loaded: true,
      filters: query
      });
    }.bind(this));
  },

  handleFilter: function(filters) {
    this.setState({
      filters: _.extend(this.state.filters, filters),
      filtersLaywyers: _.extend(this.state.filtersLaywyers, filters),
      paginate: 0
    });

    this.fetch();
  },

  render: function() {
    var lawyerNodes;

    var postNodes =  this.state.posts.map(function(post, i) {
      if(i === 0) {
        return <PostFeatured post={post} history={this.props.history} />
      }

      return <Post key={post.id} post={post} history={this.props.history} />
    }.bind(this));


    if(this.state.lawyers.length > 0) {
      lawyerNodes = this.state.lawyers.map(function(lawyer, i) {
        return (<Lawyer key={lawyer.id} lawyer={lawyer} history={this.props.history} />);
      }.bind(this));
    }

    return (
      <div>
        <TopBar title="El Actual Perú" onFilter={this.handleFilter} />

        <div id="posts" className="padding-top">
          {postNodes}
        </div>

        <div id="lawyers">
         {lawyerNodes}
        </div>

        <div style={{'float': 'left', 'width': '100%'}}>
          {this.state.loaded ? <Waypoint onEnter={this.loadMore} threshold={2} /> : ''}
        </div>
      </div>
    );
  }
});
