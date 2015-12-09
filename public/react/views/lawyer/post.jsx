'use strict';
var React = require('react');

module.exports = React.createClass({
   getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var nodes = this.props.collection.map(function(item) {
      return (
        <a href={"/posts/" + item.slug } target="_new">{item.title}</a>
      )
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});