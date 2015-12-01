'use strict';
var React = require('react');
var request = require('superagent');
var _ = require('lodash');
var Waypoint = require('react-waypoint');
var Lawyer = require('views/lawyers/lawyer.jsx');
var TopBar = require('views/top_bar.jsx');
var trans = require('langs/app');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lawyers: [],
      loaded: false,
      filters: {
        published: 1,
        order_by_spanish: '',
        paginate: 0
      }
    }
  },

  componentDidMount: function() {
    this.fetch();
  },

  handleFilter: function(filters) {
    var query = _.extend(this.state.filters, filters);

    var filters =
    request
      .get('/api/lawyers')
      .query(_.extend(query, {paginate: 0}))
      .end(function(err, res) {
        this.setState({
          lawyers: res.body,
          loaded: true,
          filters: query
        });
      }.bind(this));
  },

  fetch: function(filters) {
    var query = this.state.filters;

    request
      .get('/api/lawyers')
      .query(query)
      .end(function(err, res) {
        this.setState({
          lawyers: this.state.lawyers.concat(res.body),
          loaded: true
        });
      }.bind(this));
  },

  loadMore: function() {
    var query = this.state.filters;
    query = _.extend(query, {paginate: query.paginate + 20})

    request
    .get('/api/lawyers')
    .query(query)
    .end(function(err, res) {
      this.setState({
      lawyers: this.state.lawyers.concat(res.body),
      filters: query
      });
    }.bind(this));
  },

  render: function() {
    var lawyerNodes =  this.state.lawyers.map(function(lawyer, i) {
      return (<Lawyer key={i} lawyer={lawyer} history={this.props.history} />);
    }.bind(this));

    return (
      <div>
        <TopBar
          title={trans.lawyers}
          onFilter={this.handleFilter}
          position

          />
        <div id="lawyers" className="padding-top">
         {lawyerNodes}
        <div style={{'float': 'left', 'width': '100%'}}>
          {this.state.loaded ? <Waypoint onEnter={this.loadMore} threshold={2} /> : ''}
        </div>

        </div>
      </div>
    );
  }
});