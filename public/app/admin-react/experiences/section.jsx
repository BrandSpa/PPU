'use strict';
var React = require('react');
var Item = require('experiences/item.jsx');
var request = require('superagent');
var _ = require('underscore');
var Filters = require('filters.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      experiences: [],
      filters: {
        paginate: 0
      }
    }
  },

   fetch: function() {
    request
    .get('/api/experiences')
    .query(this.state.filters)
    .end(function(err, res) {
      this.setState({experiences: res.body})
    }.bind(this));
  },


  componentDidMount: function() {
    this.fetch();
  },

  filter: function(filters) {
    var filters = _.extend(this.state.filters, filters);
    request
    .get('/api/experiences')
    .query(filters)
    .end(function(err, res) {
      this.setState({experiences: res.body})
    }.bind(this));
  },

  seeMore: function(e) {
    e.preventDefault();
    var filters = _.extend(this.state.filters, {paginate: (this.state.filters.paginate + 20)});
    request
    .get('/api/experiences')
    .query(filters)
    .end(function(err, res) {
      this.setState({experiences: this.state.experiences.concat(res.body)})
    }.bind(this));
  },

  render: function() {
    var experiences = this.state.experiences.map(function(model) {
      return (<Item key={model.id} model={model} />);
    });

    return (
      <div className="panel">
        <div className="panel-heading">
          <h4>Experiencias</h4>
        </div>
        <div className="panel-body">
        <Filters onFilter={this.filter} position />
      <br/>
          <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                    {experiences}
                </tbody>
              </table>
          </div>
          <a href="#" className="btn btn-primary" onClick={this.seeMore}>Ver Más</a>
        </div>
      </div>
    );
  }
});
