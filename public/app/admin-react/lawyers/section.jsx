'use strict';
var React = require('react');
var Lawyer = require('lawyers/lawyer.jsx');
var request = require('superagent');
var _ = require('underscore');
var Filters = require('filters.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lawyers: [],
      filters: {
        paginate: 0
      }
    }
  },

   fetch: function() {
    request
    .get('/api/lawyers')
    .query(this.state.filters)
    .end(function(err, res) {
      this.setState({lawyers: res.body})
    }.bind(this));
  },


  componentDidMount: function() {
    this.fetch();
  },

  filter: function(filters) {
    var filters = _.extend(this.state.filters, filters);
    request
    .get('/api/lawyers')
    .query(filters)
    .end(function(err, res) {
      this.setState({lawyers: res.body})
    }.bind(this));
  },

  seeMore: function(e) {
    e.preventDefault();
    var filters = _.extend(this.state.filters, {paginate: (this.state.filters.paginate + 20)});
    request
    .get('/api/lawyers')
    .query(filters)
    .end(function(err, res) {
      this.setState({lawyers: this.state.lawyers.concat(res.body)})
    }.bind(this));
  },

  render: function() {
    var lawyers = this.state.lawyers.map(function(lawyer) {
      return (<Lawyer key={lawyer.id} lawyer={lawyer} />);
    });

    return (
      <div className="panel">
        <div className="panel-heading">
          <h4>Abogados</h4>
        </div>
        <div className="panel-body">
        <Filters onFilter={this.filter} position />
      <br/>
          <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                    {lawyers}
                </tbody>
              </table>
          </div>
          <a href="#" className="btn btn-primary" onClick={this.seeMore}>Ver Más</a>
        </div>
      </div>
    );
  }
});