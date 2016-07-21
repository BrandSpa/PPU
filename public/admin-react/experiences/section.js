'use strict';
const React = require('react');
const Item = require('experiences/item');
const request = require('superagent');
const _ = require('underscore');
const Filters = require('filters');

module.exports = React.createClass({
  getInitialState() {
    return {
      experiences: [],
      filters: {
        paginate: 0
      }
    }
  },

   fetch() {
    request
    .get('/api/experiences')
    .query(this.state.filters)
    .end((err, res) => this.setState({experiences: res.body}));
  },


  componentDidMount() {
    this.fetch();
  },

  filter(filters) {
    var filters = _.extend(this.state.filters, filters);
    request
    .get('/api/experiences')
    .query(filters)
    .end((err, res) => this.setState({experiences: res.body}));
  },

  seeMore(e) {
    e.preventDefault();
    const filters = _.extend(this.state.filters, {paginate: (this.state.filters.paginate + 20)});
    request
    .get('/api/experiences')
    .query(filters)
    .end((err, res) => this.setState({experiences: this.state.experiences.concat(res.body)}));
  },

  removeItem(id) {
    const without = _.reject(this.state.experiences, experience => experience.id == id);
    this.setState({experiences: without});
  },

  render() {
    const experiences = this.state.experiences.map(model => <Item key={model.id} model={model} onDestroy={this.removeItem} />);

    return (
      <div className="panel">
        <div className="panel-heading">
          <h4>Experiencias</h4>
        </div>
        <div className="panel-body">
        <Filters onFilter={this.filter} />
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
