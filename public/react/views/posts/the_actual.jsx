'use strict';
import React from 'react';
import request from 'superagent';
import {extend} from 'lodash';
import Waypoint from 'react-waypoint';
import Post from 'views/posts/post';
import Lawyer from 'views/lawyers/lawyer';
import PostFeatured from 'views/posts/post_featured';
import TopBar from 'views/top_bar';
import trans from 'langs/app';

export default React.createClass({
  getInitialState() {
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
        the_actual_ch: 1,
        the_actual_co: 0,
        paginate: 0
      },
      loaded: false
    }
  },

  componentDidMount() {
    this.fetch();
  },

  fetch(filters) {
    const query = extend(this.state.filters, {paginate: 0});

    request
      .get('/api/posts')
      .query(query)
      .end((err, res) => {
        this.setState({
          posts: res.body,
          loaded: true
        });
      });
  },

  fetchLawyers() {
    const query = extend(this.state.filtersLaywyers, {paginate: 0});

    request
      .get('/api/lawyers')
      .query(query)
      .end((err, res) => {
        this.setState({
          lawyers: res.body,
          loaded: true
        });
      });
  },

  loadMore() {
    let query = this.state.filters;
    query = extend(query, {paginate: query.paginate + 20})

    request
    .get('/api/posts')
    .query(query)
    .end((err, res) => {
      this.setState({
      posts: this.state.posts.concat(res.body),
      loaded: true,
      filters: query
      });
    });
  },

  handleFilter(filters) {
    this.setState({
      filters: extend(this.state.filters, filters),
      filtersLaywyers: extend(this.state.filtersLaywyers, filters),
      paginate: 0
    });

    this.fetch();
  },

  render() {
    let lawyerNodes;

    const postNodes =  this.state.posts.map((post, i) => {
      if(i === 0) {
        return <PostFeatured post={post} history={this.props.history} />
      }

      return <Post key={post.id} post={post} history={this.props.history} />
    });


    if(this.state.lawyers.length > 0) {
      lawyerNodes = this.state.lawyers.map((lawyer, i) => <Lawyer key={lawyer.id} lawyer={lawyer} history={this.props.history} />);
    }

    return (
      <div>
        <TopBar title="El Actual Chile" onFilter={this.handleFilter} />

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