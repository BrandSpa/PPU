'use strict';
import React from 'react';
import request from 'superagent';
import trans from 'langs/app';
import Waypoint from 'react-waypoint';
import Experience from 'views/experiences/experience.jsx';
import TopBar from 'views/top_bar.jsx';
import _ from 'lodash';
import getLang from 'utils/get_lang';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      experiences: [],
      loaded: false,
      filters: {
        category: null,
        country: null,
        keyword: null,
        paginate: 0,
        published: 1
      }
    }
  },

  componentDidMount: function() {
    var query = this.state.filters;

    request
    .get('/api/experiences')
    .query(query)
    .end(function(err, res) {
      this.setState({
        experiences: res.body,
        loaded: true
      });
    }.bind(this));
  },

  loadMore: function() {
    var query = this.state.filters;
    query = _.extend(query, {paginate: query.paginate + 20});

    request
      .get('/api/experiences')
      .query(query)
      .end(function(err, res) {
        this.setState({
          experiences: this.state.experiences.concat(res.body),
          loaded: true
        });
      }.bind(this));
  },

  handleFilter: function(filters) {
    var query = _.extend(this.state.filters, filters);
    query = _.extend(query, {paginate: 0});

    request
      .get('/api/experiences')
      .query(query)
      .end(function(err, res) {
        this.setState({
          experiences: res.body,
          loaded: true
        });
      }.bind(this));
  },

  render: function() {
    var  experienceNodes = this.state.experiences.map(function(experience, i) {
      return (
        <Experience
          key={experience.id}
          model={experience}
          history={this.props.history}
        />
      );
    }.bind(this));

    return (
      <div>
        <TopBar
          title={trans.experience}
          onFilter={this.handleFilter}
          />

        <div id="experiences" className="padding-top">
          {experienceNodes}
          <div style={{'float': 'left', 'width': '100%'}}>
            {this.state.loaded ? <Waypoint onEnter={this.loadMore} threshold={2} /> : ''}
          </div>
        </div>
      </div>

    );
  }
});
