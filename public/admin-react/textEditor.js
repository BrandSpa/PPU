'use strict';
const React = require('react');
const ReactQuill = require('react-quill');
const _ = require('underscore');

module.exports = React.createClass({
  getInitialState() {
    return {
      title: null,
      text: null,
      textLoad: null
    }
  },

  handleTextChange(txt) {
    const values = _.extend(this.state, {text: txt, textLoad: 'Guardando...'});
    this.setState(values);
    this.props.onChange(values);
  },

  componentWillReceiveProps(props) {
    this.setState({title: props.title, text: props.text, textLoad: null});
  },

  handleChange(txt) {
    const title = React.findDOMNode(this.refs.title).value;
    const values = _.extend(this.state, {title, textLoad: 'Guardando...'});

    this.setState(values);
    this.props.onChange(values);
  },

  render() {
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
