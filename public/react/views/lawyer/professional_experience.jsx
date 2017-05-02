'use strict';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      collection: []
    }
  },

  render() {
    var nodes = this.props.collection.map(function(model) {
      return (<li>{model.title} {model.company } {model.from} {model.until ? "- " + model.until: ""}</li>);
    });

    return (
      <div>
        <h4>{this.props.title}</h4>
        <ul>
          {nodes}
        </ul>
      </div>
    );
  }
});