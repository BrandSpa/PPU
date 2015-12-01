'use strict';
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var categoryNodes = this.props.collection.map(function(category, i) {
      return (<li key={i}>{category.name}</li>)
    });

    return (
      <div className="categories">
        <ul>
        {categoryNodes}
        </ul>
      </div>
    );
  }
});