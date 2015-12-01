'use strict';
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var nodes = this.props.collection.map(function(model) {
      return (<li>
        {model.title ? model.title + ", ": ""} {model.country} {model.from} {model.until ? "- " + model.until : ""}
        </li>
      );
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