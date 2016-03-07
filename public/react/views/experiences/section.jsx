'use strict';
var React = require('react');
var request = require('superagent');
var trans = require('langs/app');
var Waypoint = require('react-waypoint');
var Experience = require('views/experiences/experience.jsx');
var TopBar = require('views/top_bar.jsx');
var _ = require('lodash');
var getLang = require('utils/get_lang');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      experiences: [],
      loaded: false,
      filters: {
        category: null,
        country: null,
        keyword: null,
        paginate: 0
      }
    }
  },

  componentDidMount: function() {
    request
    .get('/api/experiences')
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
