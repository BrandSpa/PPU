'use strict';
var React = require('react');
var request = require('superagent');
var $ = require('jquery');

module.exports = React.createClass({
  handleClick: function() {
    var content = {
      title: React.findDOMNode(this.refs.title).value,
      text: React.findDOMNode(this.refs.text).value,
      'position': this.props.position,
      name: this.props.name
    };

     request
      .post('/api/sliders')
      .set('X-CSRF-Token', $("meta[name='csrf-token']").attr("content"))
      .send(content)
      .end(function(err, res) {
        this.props.onAdd(res.body);
      }.bind(this));
  },

  render: function() {
    return (
      <div>
        <div className="form-group col-sm-6">
          <label htmlFor="">Frase</label>
          <input ref="text" type="text" className="form-control" />
        </div>

        <div className="form-group col-sm-6">
          <label htmlFor="">Por</label>
          <input ref="title" type="text" className="form-control" />
        </div>

        <div className="form-group col-sm-12">
          <button onClick={this.handleClick} className="btn btn-sm pull-right">Guardar</button>
        </div>
      </div>
    );
  }
});