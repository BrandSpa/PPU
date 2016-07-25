'use strict';
import React from 'React';
import request from 'superagent';
function debounce(fn, delay) {
    var delayed;

    return function(e) {
        clearTimeout(delayed);
        delayed = setTimeout(function() {
            fn(e);
        }, delay);
    };
}

export default React.createClass({
  getInitialState() {
    return {
      lawyers: [],
      results: []
    }
  },

  search() {
    // /api/lawyers?search=alejandr
    let query = this.refs.lawyer.value;

    request
    .get('/api/lawyers')
    .query({search: query})
    .end((err, res) => {
      this.setState({results: res.body});
    });
  },

  add(lawyer, e) {
    e.preventDefault();
    let lawyers = [lawyer].concat(this.state.lawyers);
    this.setState({lawyers, results: []});
    this.refs.lawyer.value = "";
    this.handleChange(lawyers);
  },

  handleChange(lawyers) {
    if(typeof this.props.onChange === 'function') {
      this.props.onChange(this.getLawyerIds(lawyers));
    }
  },

  remove(lawyer, e) {
    e.preventDefault();
    let lawyers = this.state.lawyers.filter( lwyr => lwyr.id !== lawyer.id);
    this.setState({lawyers});
    this.handleChange(lawyers);
  },

  getLawyerIds(lawyers = []) {
    let ids = lawyers.map(lawyer => lawyer.id);
    return ids;
  },

  render() {

    let lawyerNodes = this.state.lawyers.map(lawyer =>
      <tr key={lawyer.id}>
        <td>{`${lawyer.name} ${lawyer.lastname}`}</td>
        <td><button className="btn" onClick={this.remove.bind(null, lawyer)}>Quitar</button></td>
      </tr>
    );

    let resultNodes = this.state.results.map(result =>
      <li
        key={result.id}
        className="list-group-item">
        {`${result.name} ${result.lastname}`} <button className="btn" onClick={this.add.bind(null, result)}>Agregar</button>
      </li>
    );

    return (
      <div>
        <div className="form-group">
        {this.getLawyerIds()}
          <input
            type="text"
            className="form-control"
            ref="lawyer"
            onChange={debounce(this.search, 350)}
            placeholder="Buscar Abogado"
          />
          <ul className="list-group">
          {resultNodes}
          </ul>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {lawyerNodes}
          </tbody>
        </table>
      </div>
    )
  }
});
