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
        if(item.file_name.url) {
          return <a href={item.file_name.url} target="_new">{item.title}</a>
        } else {
          if(item.link) {
            return <a href={item.link} target="_new">{item.title}</a>
          } else {
             return <p>{item.title}</p>
          }

        }
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});