'use strict';
const React = require('react');
const Lawyer = require('lawyers/lawyer');
const request = require('superagent');
const _ = require('underscore');
const Filters = require('../filters');

module.exports = React.createClass({
  getInitialState() {
    return {
      lawyers: [],
      filters: {
        paginate: 0
      }
    }
  },

   fetch() {
    request
    .get('/api/lawyers')
    .query(this.state.filters)
    .end((err, res) => this.setState({lawyers: res.body}));
  },


  componentDidMount() {
    this.fetch();
  },

  filter(filters) {
    var filters = _.extend(this.state.filters, filters);
    request
    .get('/api/lawyers')
    .query(filters)
    .end((err, res) => this.setState({lawyers: res.body}));
  },

  seeMore(e) {
    e.preventDefault();
    const filters = _.extend(this.state.filters, {paginate: (this.state.filters.paginate + 20)});
    request
    .get('/api/lawyers')
    .query(filters)
    .end((err, res) => this.setState({lawyers: this.state.lawyers.concat(res.body)}));
  },

  render() {
    const lawyers = this.state.lawyers.map(lawyer => <Lawyer key={lawyer.id} lawyer={lawyer} />);

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
