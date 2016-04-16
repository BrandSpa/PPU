'use strict';
var React = require('react');
var ReactQuill = require('react-quill');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title: null,
      text: null,
      textLoad: null
    }
  },

  componentDidMount: function() {
     this.textContent.blur(function() {
      console.log('blur');
     });
  },

  handleTextChange: function(txt) {
    var values = _.extend(this.state, {text: txt, textLoad: 'Guardando...'});
    this.setState(values);
  },

  handleTitleBlur: function() {
    this.props.onChange(this.state);
  },


  componentWillReceiveProps: function(props) {
    this.setState({title: props.title, text: props.text, textLoad: null});
  },

  handleChange: function(txt) {
    var title = React.findDOMNode(this.refs.title).value;
    var values = _.extend(this.state, {title: title, textLoad: 'Guardando...'});
    this.setState(values);
  },

  render: function() {
    return (
      <div className="col-lg-12 form-group" >
        <label htmlFor="" styles={this.state.textLoad ? {color: '#fff'} : {color: '#111'}}>{this.state.textLoad}</label>

        <input
          ref="title"
          type="text"
          className="form-control"
          placeholder="título"
          value={this.state.title}
          onChange={this.handleChange}
          onBlur={this.handleTitleBlur}
        />

        <ReactQuill
          ref="textContent"
          value={this.state.text}
          theme="snow"
          onChange={this.handleTextChange}
        />
      </div>
    );
  }
});
