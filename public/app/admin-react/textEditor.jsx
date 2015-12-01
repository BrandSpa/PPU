'use strict';
var React = require('react');
var ReactQuill = require('react-quill');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title: null,
      text: null
    }
  },

  handleTextChange: function(txt) {
    var values = _.extend(this.state, {text: txt});

    this.setState(values);
    this.props.onChange(values);
  },

  componentWillReceiveProps: function(props) {
    this.setState({title: props.title, text: props.text});
  },

  handleChange: function(txt) {
    var title = React.findDOMNode(this.refs.title).value;
    var values = _.extend(this.state, {title: title});

    this.setState(values);
    this.props.onChange(values);
  },



  render: function() {
    return (
      <div className="col-lg-12 form-group" >
        <input
          ref="title"
          type="text"
          className="form-control"
          placeholder="título"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <ReactQuill
          value={this.state.text}
          theme="snow"
          onChange={this.handleTextChange}
        />
      </div>
    );
  }
});