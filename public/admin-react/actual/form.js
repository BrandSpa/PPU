'use strict';
import React from 'React';
import Editor from 'actual/editor';

module.exports = React.createClass({
  componentDidMount() {
      console.log('actual form');
  },

  getInitialState() {
    return {
      content: 'what what'
    }
  },

  handleChangeText(html) {
    this.setState({content: html});
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log('content', this.state.content);
    this.setState({content: 'new content!!'});
  },

  render() {
    return (
      <div>
        <Editor onChange={this.handleChangeText} defaultValue={this.state.content} />
        <button className="btn btn-primary" onClick={this.handleSubmit}>Guardar</button>
      </div>
    )
  }
});
