'use strict';
var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      collection: []
    }
  },

  render: function() {
    var link;

    var nodes = this.props.collection.map(function(item) {
      return
        if(item.file_name.url) {
          <a href={item.file_name.url} target="_new">{item.title}</a>
        } else {
            <p>{title}</p>
        }
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});